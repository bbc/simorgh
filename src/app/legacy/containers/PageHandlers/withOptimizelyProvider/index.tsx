import { ComponentType, use, useRef } from 'react';
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
import {
  notifyDecision,
  useActivatedExperiments,
} from '#app/lib/optimizelyDecisionStore';
import { TOKEN_COOKIE_NAME } from '#app/lib/uasApi/tokenRefresh/tokenManager';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import {
  SEARCH_OJ_AA_ACTIVATION_EVENT_NAME,
  SEARCH_OJ_AA_EXPERIMENT_NAME,
} from '#app/pages/ArticlePage/SearchOjExperiment/config';
import useCustomEventTracker from '#app/hooks/useCustomEventTracker';
import isCypress from './isCypress';
import registerVisitActivity from './visitTracking';
import { getClientTimeOfDay, getReferrer, isMobile } from './userAttributes';

const PAGE_VIEW_EVENT_NAME = 'page-views';
const SIGNED_IN_PAGE_VIEW_EVENT_NAME = 'signed-in-page-views';
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

const isSignedIn = () => {
  if (disableOptimizely || !onClient() || isOperaProxy()) return false;
  return Boolean(Cookie.get(TOKEN_COOKIE_NAME));
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

const dispatchExperimentActivationBeaconToPiano = ({
  decisionKey,
  variationKey,
}) => {
  const activatedExperiments = useActivatedExperiments();

  if (activatedExperiments.has(decisionKey)) return;

  const EXPERIMENT_EVENT_DETAILS = {
    [SEARCH_OJ_AA_EXPERIMENT_NAME]: SEARCH_OJ_AA_ACTIVATION_EVENT_NAME,
  };

  const { eventName, hasTrackedActivation } =
    EXPERIMENT_EVENT_DETAILS[decisionKey];

  const trackActivation = useCustomEventTracker({
    eventName,
    experimentName: decisionKey,
    experimentVariant: variationKey ?? undefined,
  });

  if (!hasTrackedActivation.current) {
    hasTrackedActivation.current = true;
    trackActivation();
  }
};

// Optimizely reports a decision in one of two shapes depending on the experiment type.
// We normalise both into a single `decisionKey` + `impressionDispatched` so the rest
// of the app doesn't need to know which type it was:
// - Client-side (Flags/decide API): uses `flagKey`; an impression is only counted
//   when `decisionEventDispatched` is true.
// - Server-side (legacy activate API): uses `experimentKey` (the rule key) and
//   always counts an impression.
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
        dispatchExperimentActivationBeaconToPiano({
          decisionKey,
          variationKey,
        });

        const currentUrl = window.location.pathname + window.location.search;
        if (currentUrl !== lastTrackedUrl) {
          lastTrackedUrl = currentUrl;

          // the visit (denominator) must be sent before the page view (numerator)
          // so the page view falls inside Optimizely's ratio metric attribution window
          if (registerVisitActivity(Date.now())) {
            optimizely.track(VISIT_EVENT_NAME);
          }

          optimizely.track(PAGE_VIEW_EVENT_NAME);

          // proxy metric for sign-in experiments: additional to page-views,
          // fired only when the user is in a signed-in state
          if (isSignedIn()) {
            optimizely.track(SIGNED_IN_PAGE_VIEW_EVENT_NAME);
          }
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
