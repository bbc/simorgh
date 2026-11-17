import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { sendEventBeacon } from '../../../components/ATIAnalytics/beacon';

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
  reverbParameters: EventTrackingData;
  trackingFlags: {
    trackingIsEnabled: boolean;
    eventSent?: boolean;
    alwaysInView?: boolean;
  };
};

export const shouldDispatchEventBeacon = ({
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

const dispatchTrackingRequests = async ({
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
    await sendEventBeacon(reverbParameters);
  }
};

export default dispatchTrackingRequests;
