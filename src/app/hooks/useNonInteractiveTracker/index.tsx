import { use, useCallback } from 'react';
import { NON_INTERACTIVE_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon';
import useTrackingToggle from '../useTrackingToggle';
import { ServiceContext } from '../../contexts/ServiceContext';

export interface NonInteractiveEventData extends EventTrackingData {
  eventName: string;
  isUserInitiated?: boolean;
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
 * 1. Should we reuse an existing event type (e.g click/view) or introduce a new one?
 * 2. What should we use for componentName? Should it reflect the hook/component that triggered the event or be optional?
 * 3. What is the best way to pass an arbitrary `eventName` so that it's easily accessible in Piano?
 * 4. Which reverb param builder to reuse?
 */

const useNonInteractiveTracker = (
  defaultEventTrackingData: NonInteractiveEventData,
) => {
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
    eventType: NON_INTERACTIVE_EVENT,
  });

  const { trackingIsEnabled } = useTrackingToggle();
  const { service, useReverb } = use(ServiceContext);

  const trackEvent = useCallback(
    async (eventData?: Partial<NonInteractiveEventData>) => {
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
        isUserInitiated = false,
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
        const trackingComponentName = `${componentName}::${eventName}`;
        const metadataFormat = buildMetadataFormat(customData);

        try {
          await sendEventBeacon({
            type: isUserInitiated ? 'click' : 'view',
            campaignID,
            componentName: trackingComponentName,
            pageIdentifier,
            platform,
            producerId,
            producerName,
            service,
            statsDestination,
            useReverb,
            format: metadataFormat,
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('Non-interactive event tracking failed:', error);
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

export default useNonInteractiveTracker;
