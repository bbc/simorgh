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
import sendOptimizelyActivationEvent from '#app/lib/analyticsUtils/sendOptimizelyActivationEvent';
import { getActivationTrackingData } from '#app/lib/analyticsUtils/activationTrackingData';
import { TOKEN_COOKIE_NAME } from '#app/lib/uasApi/tokenRefresh/tokenManager';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import isCypress from './isCypress';
import registerVisitActivity from './visitTracking';
import { getClientTimeOfDay, getReferrer, isMobile } from './userAttributes';

const PAGE_VIEW_EVENT_NAME = 'page-views';
const SIGNED_IN_PAGE_VIEW_EVENT_NAME = 'signed-in-page-views';
const VISIT_EVENT_NAME = 'visit';
const isInCypress = isCypress();
const isStoryBook = process.env.STORYBOOK;
const disableOptimizely = isStoryBook || isInCypress;
let lastTrackedUrl: string | null = null;

if (isLive() || isInCypress) {
  setLogger(null);
}

const getUserId = () => {
  if (disableOptimizely || !onClient() || isOperaProxy()) return null;

  return Cookie.get('ckns_mvt') ?? null;
};

const isSignedIn = () => {
  if (!onClient() || isOperaProxy()) return false;
  return Boolean(Cookie.get(TOKEN_COOKIE_NAME));
};

const optimizely = createInstance({
  sdkKey: getEnvConfig().SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 10,
  eventFlushInterval: 100,
});

const trackPageEvents = () => {
  if (!onClient() || isOperaProxy()) return;

  const currentUrl = window.location.pathname + window.location.search;
  if (currentUrl === lastTrackedUrl) return;

  lastTrackedUrl = currentUrl;

  // The visit (denominator) must be sent before the page view (numerator).
  if (registerVisitActivity(Date.now())) {
    optimizely.track(VISIT_EVENT_NAME);
  }

  optimizely.track(PAGE_VIEW_EVENT_NAME);

  if (isSignedIn()) {
    optimizely.track(SIGNED_IN_PAGE_VIEW_EVENT_NAME);
  }
};

type DecisionInfo = {
  flagKey?: string;
  variationKey?: string;
  decisionEventDispatched?: boolean;
};

type ActivateNotification = ListenerPayload & {
  experiment?: { key?: string } | null;
  variation?: { key?: string } | null;
};

const resolveDecision = (decisionInfo?: DecisionInfo) => {
  return {
    decisionKey: decisionInfo?.flagKey,
    impressionDispatched: Boolean(decisionInfo?.decisionEventDispatched),
  };
};

const handleDecision = ({
  decisionKey,
  variationKey,
  impressionDispatched,
}: {
  decisionKey?: string;
  variationKey?: string;
  impressionDispatched: boolean;
}) => {
  if (!onClient()) return;

  if (decisionKey && variationKey && variationKey !== 'off') {
    const isNewDecision = notifyDecision(decisionKey);

    if (impressionDispatched) {
      if (isNewDecision) {
        const activationTrackingData = getActivationTrackingData();
        sendOptimizelyActivationEvent({
          experimentName: decisionKey,
          experimentVariant: variationKey,
          ...activationTrackingData,
        });
      }

      trackPageEvents();
    }
  }
};

optimizely?.notificationCenter?.addNotificationListener(
  enums.NOTIFICATION_TYPES.DECISION,
  (notification: ListenerPayload & { decisionInfo?: DecisionInfo }) => {
    const { decisionInfo } = notification;
    const { decisionKey, impressionDispatched } = resolveDecision(decisionInfo);

    handleDecision({
      decisionKey,
      variationKey: decisionInfo?.variationKey,
      impressionDispatched,
    });
  },
);

optimizely?.notificationCenter?.addNotificationListener(
  enums.NOTIFICATION_TYPES.ACTIVATE,
  (notification: ActivateNotification) => {
    handleDecision({
      decisionKey: notification.experiment?.key,
      variationKey: notification.variation?.key,
      impressionDispatched: Boolean(notification.experiment?.key),
    });
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
