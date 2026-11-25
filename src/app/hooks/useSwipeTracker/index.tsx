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
import { ExperimentContext } from '../../contexts/ExperimentContext';
import dispatchTrackingRequests, {
  shouldDispatchEventBeacon,
} from '../../lib/analyticsUtils/dispatchTrackingRequests';
import buildResonanceEventConfig from '../../components/ATIAnalytics/resonance/buildResonanceEventConfig';
import dispatchViewabilityEvent from '../../components/ATIAnalytics/resonance/dispatchResonanceEvent';

const getComponentSwipeTracker = (eventTrackingData?: EventTrackingData) => {
  const { service, resonanceEnabled } = use(ServiceContext);

  const eventTrackingContext = use(EventTrackingContext);
  const experimentContext = use(ExperimentContext);
  const { optimizely } = use(OptimizelyContext);

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
        optimizelyComponentName,
        viewThreshold,
        isSignedIn,
      } = extractATITrackingProps({
        eventTrackingData: swipeEventTrackingData,
        eventType: VIEW_EVENT,
        eventTrackingContextFromHook: eventTrackingContext,
        experimentContextFromHook: experimentContext,
      });

      const swipeTrackingParameters = {
        optimizelyParameters: {
          optimizely,
          experimentVariant,
          componentName,
          optimizelyComponentName,
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
    [
      eventTrackingContext,
      experimentContext,
      optimizely,
      service,
      resonanceEnabled,
      trackingIsEnabled,
    ],
  );

  return swipeTracker;
};

export default (eventTrackingData?: EventTrackingData): any => {
  const swipeTracker = getComponentSwipeTracker(eventTrackingData);

  return swipeTracker;
};
