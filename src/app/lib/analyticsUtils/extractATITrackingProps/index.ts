import { EventTrackingContext } from '#app/contexts/EventTrackingContext';
import { useContext } from 'react';
import { EventTrackingData, EventTrackingProps } from '../types';

export default ({
  eventTrackingData,
  eventType,
}: EventTrackingProps): EventTrackingData => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const eventTrackingContext = useContext(EventTrackingContext);

  const {
    componentName,
    url,
    advertiserID,
    format,
    detailedPlacement,
    optimizely,
    optimizelyMetricNameOverride,
    preventNavigation,
  } = eventTrackingData || {};

  const {
    pageIdentifier,
    platform,
    producerId,
    statsDestination,
    producerName,
  } = eventTrackingContext;

  const campaignID =
    eventTrackingData?.campaignID || eventTrackingContext?.campaignID;

  return {
    pageIdentifier,
    producerId,
    platform,
    statsDestination,
    componentName,
    campaignID,
    format,
    type: eventType,
    advertiserID,
    url,
    detailedPlacement,
    producerName,
    preventNavigation,
    optimizely,
    optimizelyMetricNameOverride,
  };
};
