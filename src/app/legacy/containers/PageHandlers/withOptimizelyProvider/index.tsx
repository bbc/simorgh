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
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import isCypress from './isCypress';
import trackPageEvents from './trackPageEvents';
import { getClientTimeOfDay, getReferrer, isMobile } from './userAttributes';

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

type ActivateNotification = ListenerPayload & {
  experiment?: { key?: string } | null;
  variation?: { key?: string } | null;
};

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

      trackPageEvents(optimizely);
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
