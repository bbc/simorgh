/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/rules-of-hooks */
import { use, useCallback } from 'react';
import { VIEW_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useTrackingToggle from '../useTrackingToggle';
import { ServiceContext } from '../../contexts/ServiceContext';
import { EventTrackingContext } from '../../contexts/EventTrackingContext';
import dispatchTrackingRequests from '../../lib/analyticsUtils/dispatchTrackingRequests';

const getComponentSwipeTracker = (eventTrackingData?: EventTrackingData) => {
  const { service } = use(ServiceContext);

  const eventTrackingContext = use(EventTrackingContext);

  const { trackingIsEnabled } = useTrackingToggle(
    eventTrackingData?.componentName,
  );

  const swipeTracker = useCallback(
    async (swipeEventTrackingData: EventTrackingData) => {
      const {
        componentName,
        format,
        advertiserID,
        url,
        pageIdentifier,
        platform,
        producerId,
        producerName,
        statsDestination,
        campaignID,
        detailedPlacement,
        groupTracker,
        itemTracker,
        alwaysInView = false,
      } = extractATITrackingProps({
        eventTrackingData: swipeEventTrackingData,
        eventType: VIEW_EVENT,
        eventTrackingContextFromHook: eventTrackingContext,
      });

      const swipeTrackingParameters = {
        reverbParameters: {
          campaignID,
          componentName,
          format,
          pageIdentifier,
          platform,
          producerId,
          producerName,
          service,
          statsDestination,
          type: VIEW_EVENT,
          advertiserID,
          url,
          detailedPlacement,
          ...(groupTracker && { groupTracker }),
          ...(itemTracker && { itemTracker }),
        },
        trackingFlags: {
          trackingIsEnabled,
          alwaysInView,
        },
      };

      await dispatchTrackingRequests(swipeTrackingParameters);
    },
    [eventTrackingContext, service, trackingIsEnabled],
  );

  return swipeTracker;
};

export default (eventTrackingData?: EventTrackingData): any => {
  const swipeTracker = getComponentSwipeTracker(eventTrackingData);

  return swipeTracker;
};
