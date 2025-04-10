import { EventTrackingContext } from '#app/contexts/EventTrackingContext';
import { useContext } from 'react';
import { ATIEventType, EventTrackingProps } from '../types';

type ExtractTrackingProps = {
  props: EventTrackingProps;
  eventType: ATIEventType;
};

export default ({
  props,
  eventType,
}: ExtractTrackingProps): EventTrackingProps => {
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
  } = props;

  const {
    pageIdentifier,
    platform,
    producerId,
    statsDestination,
    producerName,
  } = eventTrackingContext;

  const campaignID = props?.campaignID || eventTrackingContext?.campaignID;

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
