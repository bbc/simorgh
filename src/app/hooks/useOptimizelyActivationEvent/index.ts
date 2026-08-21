import { use, useCallback } from 'react';
import { VIEW_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import sendOptimizelyActivationEvent from '#app/lib/analyticsUtils/sendOptimizelyActivationEvent';
import { ServiceContext } from '#contexts/ServiceContext';
import useTrackingToggle from '../useTrackingToggle';

/**
 * Returns a stable callback that fires a standalone Piano/Reverb "activation"
 * event for the given Optimizely experiment/variant, gathering the required
 * ATI context (page, service, tracking toggle) once per render.
 */
const useOptimizelyActivationEvent = () => {
  const {
    pageIdentifier,
    platform,
    producerId,
    producerName,
    statsDestination,
    isSignedIn,
    hashedId,
  } = extractATITrackingProps({ eventType: VIEW_EVENT });

  const { trackingIsEnabled } = useTrackingToggle();
  const { service } = use(ServiceContext);

  return useCallback(
    (experimentName: string, experimentVariant: string) =>
      sendOptimizelyActivationEvent({
        experimentName,
        experimentVariant,
        trackingIsEnabled,
        pageIdentifier,
        platform,
        producerId,
        producerName,
        statsDestination,
        service,
        isSignedIn,
        hashedId,
      }),
    [
      trackingIsEnabled,
      pageIdentifier,
      platform,
      producerId,
      producerName,
      statsDestination,
      service,
      isSignedIn,
      hashedId,
    ],
  );
};

export default useOptimizelyActivationEvent;
