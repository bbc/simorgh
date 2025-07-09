import { use, useCallback } from 'react';
import { CUSTOM_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon';
import useTrackingToggle from '../useTrackingToggle';
import { ServiceContext } from '../../contexts/ServiceContext';

// TODO: Might not extend the EventTrackingData;
export interface CustomEventData extends EventTrackingData {
  eventName: string;
  customData?: Record<string, unknown>;
}

// TODO: Consider moving this utility for reusability?
const buildMetadataFormat = (
  customData: Record<string, unknown>,
): string | undefined => {
  const entries = Object.entries(customData);
  if (entries.length === 0) return undefined;

  return entries.map(([key, value]) => `${key}=${String(value)}`).join('~');
};

/**
 * Considerations:
 * 1. Which property to be used to pass custom/arbitrary data to the Reverb
 * - TBC
 */

const useCustomEventTracker = (defaultEventTrackingData: CustomEventData) => {
  // TODO: Review if all data is needed;
  const {
    pageIdentifier,
    producerId,
    platform,
    statsDestination,
    componentName: baseComponentName,
    campaignID,
    producerName,
  } = extractATITrackingProps({
    eventTrackingData: defaultEventTrackingData,
    eventType: CUSTOM_EVENT,
  });

  const { trackingIsEnabled } = useTrackingToggle();
  const { service, useReverb } = use(ServiceContext);

  const trackEvent = useCallback(
    async (eventData?: Partial<CustomEventData>) => {
      if (!trackingIsEnabled) return;

      // Override the default details if needed
      const mergedData = {
        ...defaultEventTrackingData,
        ...eventData,
        customData: {
          ...defaultEventTrackingData?.customData,
          ...eventData?.customData,
        },
      };

      const {
        eventName,
        customData = {},
        componentName = baseComponentName,
      } = mergedData;

      if (!eventName) return;

      const shouldSendEvent = [
        campaignID,
        componentName,
        pageIdentifier,
        platform,
        producerId,
        producerName,
        service,
        statsDestination,
      ].every(Boolean);

      if (shouldSendEvent) {
        // TODO: Temp - TBC
        const trackingComponentName = `${componentName}::${eventName}`;
        // TODO: TBC - depends what meta data we pass
        const metadataFormat = buildMetadataFormat(customData);

        try {
          await sendEventBeacon({
            type: CUSTOM_EVENT,
            campaignID,
            componentName: trackingComponentName,
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
      baseComponentName,
      campaignID,
      pageIdentifier,
      platform,
      producerId,
      producerName,
      service,
      statsDestination,
      useReverb,
      defaultEventTrackingData,
    ],
  );

  return {
    trackEvent,
  };
};

export default useCustomEventTracker;
