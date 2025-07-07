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

const useNonInteractiveTracker = (
  eventTrackingData?: NonInteractiveEventData,
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
    eventTrackingData,
    eventType: NON_INTERACTIVE_EVENT,
  });

  const { trackingIsEnabled } = useTrackingToggle();
  const { service, useReverb } = use(ServiceContext);

  const trackEvent = useCallback(
    async (eventData: NonInteractiveEventData) => {
      if (!trackingIsEnabled) return;

      const {
        eventName,
        isUserInitiated = false,
        customData = {},
        componentName = baseComponentName,
      } = eventData;

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
    ],
  );

  return {
    trackEvent,
  };
};

export default useNonInteractiveTracker;
