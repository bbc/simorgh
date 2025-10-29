import { use, useCallback } from 'react';
import { VIEW_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon';
import useTrackingToggle from '../useTrackingToggle';
import { ServiceContext } from '../../contexts/ServiceContext';

interface CustomEventData {
  eventName: string;
}

/**
 * A specialized React hook for tracking custom (non-click, non-view) events.
 * Reverb is used to send the beacon. The event will appear in Piano under the "Event - Group" field.
 * If a payload (`stringifiedData`) is provided to the `trackEvent` function, it will appear in Piano under the "Item name" field.
 *
 * @param {CustomEventData} eventName - A string representing the name of the custom event.
 * @returns {Object} An object containing the `trackEvent` function, which can be called to trigger the event.
 */

const useCustomEventTracker = ({ eventName }: CustomEventData) => {
  const {
    pageIdentifier,
    producerId,
    platform,
    statsDestination,
    campaignID,
    producerName,
  } = extractATITrackingProps({
    eventType: VIEW_EVENT,
  });

  const { trackingIsEnabled } = useTrackingToggle();
  const { service, useReverb } = use(ServiceContext);

  const trackEvent = useCallback(
    async (stringifiedData = '') => {
      console.log(`📌 ${eventName}, ${stringifiedData}`);
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
            useReverb,
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
      statsDestination,
      useReverb,
    ],
  );

  // TODO - should it just return a function?
  return {
    trackEvent,
  };
};

export default useCustomEventTracker;
