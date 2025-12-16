/* eslint-disable no-console */
// TODO: Used for testing - to be removed removed before merging
import { useState, use, useCallback } from 'react';
import usePWAInstallPrompt from '#app/hooks/usePWAInstallPrompt';
import PromotionalBanner from '#app/components/PromotionalBanner';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import useAndroidDetection from '#app/hooks/useAdroidDetection';
import useClickTracker from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import useCustomEventTracker from '#app/hooks/useCustomEventTracker';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import useIsPWA from '#app/hooks/useIsPWA';

const PWA_PROMOTIONAL_BANNER_EXPERIMENT_NAME = 'newswb_ws_pwa_promo_prompt';
const PWA_BANNER_DISMISS_KEY = 'pwa_promotional_banner_dismissals';
const PWA_BANNER_LAST_DISMISS_KEY = 'pwa_promotional_banner_last_dismissed';
const PWA_BANNER_MAX_DISMISSALS = 3;
const PWA_BANNER_DISMISS_INTERVAL_MS = 10 * 24 * 60 * 60 * 1000; // 10 days

const getBannerDismissals = () =>
  parseInt(localStorage.getItem(PWA_BANNER_DISMISS_KEY) ?? '0', 10);

const getBannerLastDismissed = () =>
  parseInt(localStorage.getItem(PWA_BANNER_LAST_DISMISS_KEY) ?? '0', 10);

const setBannerDismissed = () => {
  const dismissals = getBannerDismissals() + 1;
  localStorage.setItem(PWA_BANNER_DISMISS_KEY, String(dismissals));
  localStorage.setItem(PWA_BANNER_LAST_DISMISS_KEY, String(Date.now()));
};

const isBannerVisible = () => {
  if (typeof window === 'undefined') return false;
  const dismissals = getBannerDismissals();
  const lastDismissed = getBannerLastDismissed();
  const now = Date.now();
  if (dismissals >= PWA_BANNER_MAX_DISMISSALS) return false;
  if (lastDismissed && now - lastDismissed < PWA_BANNER_DISMISS_INTERVAL_MS)
    return false;
  return true;
};

// Control group - fire the control group pixel
const PWAPromotionalBannerControl = () => {
  const pwaPromoBannerVariant = useOptimizelyVariation({
    experimentName: PWA_PROMOTIONAL_BANNER_EXPERIMENT_NAME,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  const { isInstallable } = usePWAInstallPrompt({ preventNative: false });

  const viewTracker = useViewTracker({
    componentName: 'pwa-promotional-banner',
    experimentName: PWA_PROMOTIONAL_BANNER_EXPERIMENT_NAME,
    experimentVariant: pwaPromoBannerVariant,
    alwaysInView: true,
  });

  console.log(`PWAPromotionalBannerControl`, { isInstallable });

  return <VisuallyHiddenText {...viewTracker} />;
};

// Treatment group - actual PWA banner
const PWAPromotionalBannerTreatment = () => {
  const { promotionalBanner } = use(ServiceContext);
  const [isVisible, setIsVisible] = useState(() => isBannerVisible());

  // EXPERIMENT: PWA Promotional Banner
  const pwaPromoBannerVariant = useOptimizelyVariation({
    experimentName: PWA_PROMOTIONAL_BANNER_EXPERIMENT_NAME,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  const optimizelyExperimentData = {
    experimentName: PWA_PROMOTIONAL_BANNER_EXPERIMENT_NAME,
    experimentVariant: pwaPromoBannerVariant || 'off',
  };

  const viewTracker = useViewTracker({
    componentName: 'pwa-promotional-banner',
    ...optimizelyExperimentData,
  });

  const { onClick: onPrimaryClickTrack } = useClickTracker({
    componentName: 'pwa-promotional-banner-primary',
    ...optimizelyExperimentData,
  });
  const { onClick: onSecondaryClickTrack } = useClickTracker({
    componentName: 'pwa-promotional-banner-secondary',
    ...optimizelyExperimentData,
  });
  const { onClick: onCloseClickTrack } = useClickTracker({
    componentName: 'pwa-promotional-banner-close',
    ...optimizelyExperimentData,
  });

  const trackPwaPromptShown = useCustomEventTracker({
    eventName: 'pwa-prompt-shown',
    ...optimizelyExperimentData,
  });
  const trackPwaPromptAccepted = useCustomEventTracker({
    eventName: 'pwa-prompt-accepted',
    ...optimizelyExperimentData,
  });
  const trackPwaPromptDismissed = useCustomEventTracker({
    eventName: 'pwa-prompt-dismissed',
    ...optimizelyExperimentData,
  });

  const handleBannerDismiss = useCallback(() => {
    setBannerDismissed();
    setIsVisible(false);
  }, []);

  const handleSecondaryClick = useCallback(
    (event?: React.MouseEvent) => {
      onSecondaryClickTrack?.(event);
      handleBannerDismiss();
    },
    [onSecondaryClickTrack, handleBannerDismiss],
  );

  const { promptInstall, isInstallable } = usePWAInstallPrompt({
    onAccepted: () => {
      setIsVisible(false);
      trackPwaPromptAccepted();
    },
    onDismissed: () => {
      handleBannerDismiss();
      trackPwaPromptDismissed();
    },
    onError: () => setIsVisible(false),
    onPromptShown: trackPwaPromptShown,
  });

  const handlePrimaryClick = useCallback(
    (event?: React.MouseEvent) => {
      onPrimaryClickTrack?.(event);
      promptInstall();
    },
    [onPrimaryClickTrack, promptInstall],
  );

  console.log(`PWAPromotionalBannerTreatment`, { isInstallable, isVisible });

  if (!isVisible || !isInstallable || !promotionalBanner) {
    return null;
  }

  return (
    <div {...viewTracker}>
      <PromotionalBanner
        title={promotionalBanner.title}
        description={promotionalBanner.description}
        orText={promotionalBanner.orText}
        primaryButton={{
          text: promotionalBanner.primaryButton.text,
          longText: promotionalBanner.primaryButton.longText,
        }}
        onPrimaryClick={handlePrimaryClick}
        secondaryButton={{
          text: promotionalBanner.secondaryButton.text,
        }}
        onSecondaryClick={handleSecondaryClick}
        isDismissible
        onClose={(e?: React.MouseEvent) => {
          onCloseClickTrack?.(e);
          handleBannerDismiss();
        }}
        bannerLabel={promotionalBanner.bannerLabel}
        closeLabel={promotionalBanner.closeLabel}
      />
    </div>
  );
};

const PWAPromotionalBanner = () => {
  const { isLite, isAmp } = use(RequestContext);
  const isPWA = useIsPWA();
  const isAndroid = useAndroidDetection();

  const pwaPromoBannerExperimentName = PWA_PROMOTIONAL_BANNER_EXPERIMENT_NAME;
  const pwaPromoBannerVariant = useOptimizelyVariation({
    experimentName: pwaPromoBannerExperimentName,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  console.log(`📌 PWAPromotionalBanner`, { pwaPromoBannerVariant, isPWA });

  if (isLite || isAmp || isPWA || !isAndroid) {
    return null;
  }

  if (pwaPromoBannerVariant === 'control') {
    return <PWAPromotionalBannerControl />;
  }

  if (pwaPromoBannerVariant === 'on') {
    return <PWAPromotionalBannerTreatment />;
  }

  return null;
};

export default PWAPromotionalBanner;
