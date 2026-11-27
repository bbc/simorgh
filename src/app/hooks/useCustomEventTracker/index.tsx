import { use, useCallback } from 'react';
import { VIEW_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon';
import useTrackingToggle from '../useTrackingToggle';
import { ServiceContext } from '../../contexts/ServiceContext';
import buildResonanceEventConfig from '../../components/ATIAnalytics/resonance/buildResonanceEventConfig';
import dispatchViewabilityEvent from '../../components/ATIAnalytics/resonance/dispatchResonanceEvent';

interface CustomEventData {
  eventName: string;
}

type TrackEventFunction = (stringifiedData?: string) => Promise<void>;

/**
 * A specialized React hook for tracking custom (non-click, non-view) events.
 * Reverb is used to send the beacon. The event will appear in Piano under the "Event - Group" field.
 * If a payload (`stringifiedData`) is provided to the `trackEvent` function, it will appear in Piano under the "Item name" field.
 *
 * Events fired inside an <Experiment> are attributed to that experiment.
 *
 * @param {CustomEventData} eventName - A string representing the name of the custom event.
 * @returns {TrackEventFunction} A function that triggers the custom event. Accepts an optional stringified data parameter.
 */

const useCustomEventTracker = ({
  eventName,
}: CustomEventData): TrackEventFunction => {
  const {
    pageIdentifier,
    producerId,
    platform,
    statsDestination,
    campaignID,
    producerName,
    isSignedIn,
    hashedId,
    isPersonalisationOn,
    experimentName,
    experimentVariant,
  } = extractATITrackingProps({
    eventType: VIEW_EVENT,
  });

  const { trackingIsEnabled } = useTrackingToggle();
  const { service, resonanceEnabled } = use(ServiceContext);

  const trackEvent = useCallback(
    async (stringifiedData = '') => {
      if (!trackingIsEnabled || !eventName) return;

      const shouldSendEvent = [
        campaignID,
        eventName,
        pageIdentifier,
        platform,
        producerId,
        producerName,
        service,
        statsDestination,
      ].every(Boolean);

      if (shouldSendEvent) {
        // Temporary Resonance dual-run, independent of the Reverb beacon below (see ticket).
        if (resonanceEnabled) {
          dispatchViewabilityEvent(
            buildResonanceEventConfig({
              type: VIEW_EVENT,
              componentName: eventName,
              ...(stringifiedData && {
                itemTracker: { label: stringifiedData },
              }),
              campaignID,
              pageIdentifier,
              platform,
              producerName,
              experimentName,
              experimentVariant,
              isSignedIn,
            }),
          );
        }

        try {
          await sendEventBeacon({
            type: VIEW_EVENT,
            eventGroupingName: eventName,
            componentName: stringifiedData,
            campaignID,
            pageIdentifier,
            platform,
            producerId,
            producerName,
            service,
            statsDestination,
            experimentName,
            experimentVariant,
            isSignedIn,
            hashedId,
            isPersonalisationOn,
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('Custom event tracking failed:', error);
        }
      }
    },
    [
      trackingIsEnabled,
      eventName,
      campaignID,
      pageIdentifier,
      platform,
      producerId,
      producerName,
      service,
      resonanceEnabled,
      statsDestination,
      experimentName,
      experimentVariant,
      isSignedIn,
      hashedId,
      isPersonalisationOn,
    ],
  );

  return trackEvent;
};

export default useCustomEventTracker;
