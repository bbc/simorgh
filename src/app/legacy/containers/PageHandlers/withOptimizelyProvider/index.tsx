import { ComponentType, use } from 'react';
import {
  createInstance,
  OptimizelyProvider,
  setLogger,
} from '@optimizely/react-sdk';
import { enums, ListenerPayload } from '@optimizely/optimizely-sdk';
import Cookie from 'js-cookie';
import isLive from '#lib/utilities/isLive';
import onClient from '#lib/utilities/onClient';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { notifyDecision } from '#app/lib/optimizelyDecisionStore';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import isCypress from './isCypress';
import registerVisitActivity from './visitTracking';
import { getClientTimeOfDay, getReferrer, isMobile } from './userAttributes';

const PAGE_VIEW_EVENT_NAME = 'page-views';
const VISIT_EVENT_NAME = 'visit';
let lastTrackedUrl: string | null = null;
const isInCypress = isCypress();
const isStoryBook = process.env.STORYBOOK;
const disableOptimizely = isStoryBook || isInCypress;

if (isLive() || isInCypress) {
  setLogger(null);
}

const getUserId = () => {
  if (disableOptimizely || !onClient() || isOperaProxy()) return null;

  return Cookie.get('ckns_mvt') ?? null;
};

const optimizely = createInstance({
  sdkKey: getEnvConfig().SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 10,
  eventFlushInterval: 100,
});

type DecisionInfo = {
  flagKey?: string;
  experimentKey?: string;
  variationKey?: string;
  decisionEventDispatched?: boolean;
};

// Downstream (decision store + page metrics) every experiment is keyed by a
// single identifier. Optimizely's DECISION notification exposes that identifier
// differently depending on the experiment type:
// - Client-side experiments use the Flags (decide) API, identified by a flag key,
//   and only count an impression when `decisionEventDispatched` is true.
// - Server-side experiments use the legacy activate API, identified by a rule key
//   (exposed by the SDK as `experimentKey`), and always dispatch an impression.
const resolveDecision = (decisionInfo?: DecisionInfo) => {
  const clientSideFlagKey = decisionInfo?.flagKey;
  const serverSideRuleKey = decisionInfo?.experimentKey;
  const isClientSideDecision = Boolean(clientSideFlagKey);

  return isClientSideDecision
    ? {
        decisionKey: clientSideFlagKey,
        impressionDispatched: Boolean(decisionInfo?.decisionEventDispatched),
      }
    : {
        decisionKey: serverSideRuleKey,
        impressionDispatched: Boolean(serverSideRuleKey),
      };
};

optimizely?.notificationCenter?.addNotificationListener(
  enums.NOTIFICATION_TYPES.DECISION,
  (notification: ListenerPayload & { decisionInfo?: DecisionInfo }) => {
    if (!onClient()) return;

    const { decisionInfo } = notification;
    const variationKey = decisionInfo?.variationKey;
    const { decisionKey, impressionDispatched } = resolveDecision(decisionInfo);

    if (decisionKey && variationKey && variationKey !== 'off') {
      if (impressionDispatched) {
        const currentUrl = window.location.pathname + window.location.search;
        if (currentUrl !== lastTrackedUrl) {
          lastTrackedUrl = currentUrl;

          // the visit (denominator) must be sent before the page view (numerator)
          // so the page view falls inside Optimizely's ratio metric attribution window
          if (registerVisitActivity(Date.now())) {
            optimizely.track(VISIT_EVENT_NAME);
          }

          optimizely.track(PAGE_VIEW_EVENT_NAME);
        }
      }

      notifyDecision(decisionKey);
    }
  },
);

const withOptimizelyProvider = <T,>(Component: ComponentType<T>) => {
  return props => {
    if (disableOptimizely) return <Component {...props} />;

    const { service } = use(ServiceContext);
    const { country } = use(RequestContext);

    return (
      <OptimizelyProvider
        optimizely={optimizely}
        isServerSide
        timeout={1000}
        user={{
          id: getUserId(),
          attributes: {
            country: country ?? null,
            service,
            mobile: isMobile(),
            referrer: getReferrer(),
            timeOfDay: getClientTimeOfDay(),
          },
        }}
      >
        <Component {...props} />
      </OptimizelyProvider>
    );
  };
};

export default withOptimizelyProvider;
