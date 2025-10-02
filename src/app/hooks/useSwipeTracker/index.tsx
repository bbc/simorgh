/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/rules-of-hooks */
import { use, useCallback } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { VIEW_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useTrackingToggle from '../useTrackingToggle';
import { ServiceContext } from '../../contexts/ServiceContext';
import { EventTrackingContext } from '../../contexts/EventTrackingContext';
import dispatchTrackingRequests from '../useViewTracker/dispatchTrackingRequests';

const getComponentSwipeTracker = (eventTrackingData?: EventTrackingData) => {
  const { optimizely } = use(OptimizelyContext);

  const { service, useReverb } = use(ServiceContext);

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
        sendOptimizelyEvents,
        experimentName,
        experimentVariant,
        groupTracker,
        itemTracker,
        alwaysInView = false,
      } = extractATITrackingProps({
        eventTrackingData: swipeEventTrackingData,
        eventType: VIEW_EVENT,
        eventTrackingContextFromHook: eventTrackingContext,
      });

      const swipeTrackingParameters = {
        optimizelyParameters: {
          optimizely,
          sendOptimizelyEvents,
          experimentVariant,
          componentName,
        },
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
          useReverb,
          ...(groupTracker && { groupTracker }),
          ...(itemTracker && { itemTracker }),
          ...(experimentVariant &&
            experimentVariant !== 'off' && {
              experimentName,
              experimentVariant,
            }),
        },
        trackingFlags: {
          trackingIsEnabled,
          alwaysInView,
        },
      };

      console.log('$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%');
      console.log(`SWIPE EVENT FIRED`);
      console.log(`${JSON.stringify(eventTrackingData)}`);
      console.log(`${JSON.stringify(swipeTrackingParameters)}`);
      console.log('$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%');

      await dispatchTrackingRequests(swipeTrackingParameters);
    },
    [
      eventTrackingContext,
      eventTrackingData,
      optimizely,
      service,
      trackingIsEnabled,
      useReverb,
    ],
  );

  return swipeTracker;
};

export default (eventTrackingData?: EventTrackingData): any => {
  const swipeTracker = getComponentSwipeTracker(eventTrackingData);

  return swipeTracker;
};
