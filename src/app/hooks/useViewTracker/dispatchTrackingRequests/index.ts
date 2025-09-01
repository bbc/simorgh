// import { OptimizelyContext } from '@optimizely/react-sdk';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { sendEventBeacon } from '../../../components/ATIAnalytics/beacon';

// { optimizely: typeof OptimizelyContext } &

type OptimizelyParameters = Pick<
  EventTrackingData,
  'sendOptimizelyEvents' | 'experimentVariant' | 'componentName'
>;

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
> & { trackingIsEnabled: boolean; eventSent?: boolean };

type ViewTrackerRequestsParameters = {
  optimizelyParameters: OptimizelyParameters;
  reverbParameters: EventTrackingData;
  trackingIsEnabled: boolean;
  eventSent?: boolean;
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

  return [hasRequiredProps, trackingIsEnabled, !eventSent].every(Boolean);
};

const trackComponentInOptimizely = ({
  optimizely,
  sendOptimizelyEvents,
  experimentVariant,
  componentName,
}: OptimizelyParameters) => {
  if (
    optimizely &&
    sendOptimizelyEvents &&
    experimentVariant &&
    experimentVariant !== 'off'
  ) {
    const overrideAttributes = optimizely?.user.attributes;

    optimizely.track(
      `${componentName}-views`,
      optimizely.user.id as string,
      overrideAttributes,
    );
  }
};

const dispatchTrackingRequests = ({
  optimizelyParameters,
  reverbParameters,
  trackingIsEnabled,
  eventSent,
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
  });

  if (shouldSendEvent) {
    trackComponentInOptimizely(optimizelyParameters);

    sendEventBeacon(reverbParameters);
  }
};

export default dispatchTrackingRequests;
