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
import dispatchTrackingRequests, {
  shouldDispatchEventBeacon,
} from '../../lib/analyticsUtils/dispatchTrackingRequests';
// Temporary Resonance dual-run (see ticket) - safe to remove as a unit once Reverb is retired.
import buildResonanceEventConfig from '../../components/ATIAnalytics/resonance/buildResonanceEventConfig';
import dispatchViewabilityEvent from '../../components/ATIAnalytics/resonance/dispatchResonanceEvent';

const getComponentSwipeTracker = (eventTrackingData?: EventTrackingData) => {
  const { service, resonanceEnabled } = use(ServiceContext);

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
        experimentName,
        experimentVariant,
        viewThreshold,
        isSignedIn,
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

      // Temporary Resonance dual-run, independent of the Reverb dispatch below (see ticket).
      if (resonanceEnabled) {
        const shouldSendResonanceEvent = shouldDispatchEventBeacon({
          campaignID,
          componentName,
          pageIdentifier,
          platform,
          producerId,
          producerName,
          service,
          statsDestination,
          trackingIsEnabled,
          alwaysInView,
        });
        if (shouldSendResonanceEvent) {
          dispatchViewabilityEvent(
            buildResonanceEventConfig({
              pageIdentifier,
              campaignID,
              componentName,
              producerName,
              type: VIEW_EVENT,
              url,
              experimentName,
              experimentVariant,
              itemTracker,
              groupTracker,
              viewThreshold,
              platform,
              isSignedIn,
            }),
          );
        }
      }

      await dispatchTrackingRequests(swipeTrackingParameters);
    },
    [eventTrackingContext, service, resonanceEnabled, trackingIsEnabled],
  );

  return swipeTracker;
};

export default (eventTrackingData?: EventTrackingData): any => {
  const swipeTracker = getComponentSwipeTracker(eventTrackingData);

  return swipeTracker;
};
