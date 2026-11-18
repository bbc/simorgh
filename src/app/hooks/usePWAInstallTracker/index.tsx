import { useEffect, useRef } from 'react';
import useExperimentVariation, {
  ExperimentType,
} from '#app/hooks/useExperimentVariation';
import useCustomEventTracker from '../useCustomEventTracker';
/**
 * A hook to track PWA installation events using Reverb Analytics
 */
const usePWAInstallTracker = () => {
  // EXPERIMENT: PWA Promotional Banner
  const pwaPromoBannerExperimentName = 'newswb_ws_pwa_promo_prompt';
  const pwaPromoBannerVariant = useExperimentVariation({
    experimentName: pwaPromoBannerExperimentName,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  const trackEvent = useCustomEventTracker({
    eventName: 'pwa-installed',
    ...(pwaPromoBannerVariant && {
      experimentName: pwaPromoBannerExperimentName,
      experimentVariant: pwaPromoBannerVariant,
    }),
  });

  const trackRef = useRef(false);

  useEffect(() => {
    const handleAppInstalled = () => {
      if (!trackRef.current) {
        trackEvent();
        trackRef.current = true;
      }
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [trackEvent]);
};

export default usePWAInstallTracker;
