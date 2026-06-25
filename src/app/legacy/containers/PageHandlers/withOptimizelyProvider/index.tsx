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
import { getClientTimeOfDay, getReferrer, isMobile } from './userAttributes';

const PAGE_VIEW_EVENT_NAME = 'page-views';
const trackedPageViewUrls = new Set<string>();
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

optimizely?.notificationCenter?.addNotificationListener(
  enums.NOTIFICATION_TYPES.DECISION,
  (
    notification: ListenerPayload & {
      decisionInfo?: {
        flagKey?: string;
        variationKey?: string;
        decisionEventDispatched?: boolean;
      };
    },
  ) => {
    if (!onClient()) return;

    const flagKey = notification.decisionInfo?.flagKey;
    const variationKey = notification.decisionInfo?.variationKey;

    if (flagKey && variationKey && variationKey !== 'off') {
      const decisionEventDispatched =
        notification.decisionInfo?.decisionEventDispatched;

      if (decisionEventDispatched) {
        const currentUrl = window.location.pathname;
        if (!trackedPageViewUrls.has(currentUrl)) {
          trackedPageViewUrls.add(currentUrl);
          optimizely.track(PAGE_VIEW_EVENT_NAME);
        }
      }

      notifyDecision(flagKey);
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
