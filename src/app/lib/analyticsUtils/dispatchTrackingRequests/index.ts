/* eslint-disable import/no-unresolved */
import { OptimizelyContextInterface } from '@optimizely/react-sdk/dist/Context';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { sendEventBeacon } from '../../../components/ATIAnalytics/beacon';

type OptimizelyParameters =
  | (Pick<OptimizelyContextInterface, 'optimizely'> &
      Pick<
        EventTrackingData,
        'sendOptimizelyEvents' | 'experimentVariant' | 'componentName'
      >)
  | undefined;

type RequiredEventProps = Pick<
  EventTrackingData,
  | 'campaignID'
  | 'componentName'
  | 'pageIdentifier'
  | 'platform'
  | 'producerId'
  | 'producerName'
  | 'service'
  | 'statsDestination'
> & { trackingIsEnabled: boolean; eventSent?: boolean; alwaysInView?: boolean };

type ViewTrackerRequestsParameters = {
  optimizelyParameters?: OptimizelyParameters;
  reverbParameters: EventTrackingData;
  trackingFlags: {
    trackingIsEnabled: boolean;
    eventSent?: boolean;
    alwaysInView?: boolean;
  };
};

const shouldDispatchEventBeacon = ({
  campaignID,
  componentName,
  pageIdentifier,
  platform,
  producerId,
  producerName,
  service,
  statsDestination,
  trackingIsEnabled,
  eventSent,
  alwaysInView,
}: RequiredEventProps) => {
  const hasRequiredProps = [
    campaignID,
    componentName,
    pageIdentifier,
    platform,
    producerId,
    producerName,
    service,
    statsDestination,
  ].every(Boolean);

  return [
    hasRequiredProps,
    trackingIsEnabled,
    !eventSent || alwaysInView,
  ].every(Boolean);
};

const trackComponentInOptimizely = (
  optimizelyParameters: OptimizelyParameters,
) => {
  if (!optimizelyParameters) return;

  const { optimizely, sendOptimizelyEvents, experimentVariant, componentName } =
    optimizelyParameters;

  if (
    optimizely &&
    sendOptimizelyEvents &&
    experimentVariant &&
    experimentVariant !== 'off'
  ) {
    const overrideAttributes = optimizely.user.attributes;

    optimizely.track(
      `${componentName}-views`,
      optimizely.user.id as string,
      overrideAttributes,
    );
  }
};

const dispatchTrackingRequests = async ({
  optimizelyParameters,
  reverbParameters,
  trackingFlags,
}: ViewTrackerRequestsParameters) => {
  const {
    campaignID,
    componentName,
    pageIdentifier,
    platform,
    producerId,
    producerName,
    service,
    statsDestination,
  } = reverbParameters;

  const { trackingIsEnabled, eventSent, alwaysInView } = trackingFlags;

  const shouldSendEvent = shouldDispatchEventBeacon({
    campaignID,
    componentName,
    pageIdentifier,
    platform,
    producerId,
    producerName,
    service,
    statsDestination,
    trackingIsEnabled,
    eventSent,
    alwaysInView,
  });

  if (shouldSendEvent) {
    trackComponentInOptimizely(optimizelyParameters);

    await sendEventBeacon(reverbParameters);
  }
};

export default dispatchTrackingRequests;
