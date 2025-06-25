import { use } from 'react';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';
import { EventTrackingData, EventTrackingProps } from '../types';

export default ({
  eventTrackingData,
  eventType,
}: EventTrackingProps): EventTrackingData => {
  const eventTrackingContext = use(EventTrackingContext);

  const {
    componentName = '',
    url,
    advertiserID,
    format,
    detailedPlacement,
    preventNavigation,
    sendOptimizelyEvents,
    experimentName,
    experimentVariant,
    itemTracker,
    groupTracker,
    viewThreshold,
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
    sendOptimizelyEvents,
    experimentName,
    experimentVariant,
    itemTracker,
    groupTracker,
    viewThreshold,
  };
};
