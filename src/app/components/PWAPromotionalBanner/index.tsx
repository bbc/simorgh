import { useState, use, useCallback } from 'react';
import usePWAInstallPrompt from '#app/hooks/usePWAInstallPrompt';
import PromotionalBanner from '#app/components/PromotionalBanner';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import useExperimentVariation, {
  ExperimentType,
} from '#app/hooks/useExperimentVariation';
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

type ExperimentControlProps = {
  experimentVariant: string;
};

// Control group - fire the control group pixel
const PWAPromotionalBannerControl = ({
  experimentVariant,
}: ExperimentControlProps) => {
  const { isInstallable } = usePWAInstallPrompt({ deferPrompt: false });
  const viewTracker = useViewTracker({
    componentName: 'pwa-promotional-banner',
    experimentName: PWA_PROMOTIONAL_BANNER_EXPERIMENT_NAME,
    experimentVariant,
    alwaysInView: true,
  });

  if (!isInstallable) {
    return null;
  }

  return <VisuallyHiddenText {...viewTracker} />;
};

// Treatment group - actual PWA banner
const PWAPromotionalBannerTreatment = ({
  experimentVariant,
}: ExperimentControlProps) => {
  const { promotionalBanner } = use(ServiceContext);
  const [isVisible, setIsVisible] = useState(() => isBannerVisible());

  // EXPERIMENT: PWA Promotional Banner
  const experimentTrackingData = {
    experimentName: PWA_PROMOTIONAL_BANNER_EXPERIMENT_NAME,
    experimentVariant,
  };

  const viewTracker = useViewTracker({
    componentName: 'pwa-promotional-banner',
    ...experimentTrackingData,
  });

  const { onClick: onPrimaryClickTrack } = useClickTracker({
    componentName: 'pwa-promotional-banner-primary',
    ...experimentTrackingData,
  });
  const { onClick: onSecondaryClickTrack } = useClickTracker({
    componentName: 'pwa-promotional-banner-secondary',
    ...experimentTrackingData,
  });
  const { onClick: onCloseClickTrack } = useClickTracker({
    componentName: 'pwa-promotional-banner-close',
    ...experimentTrackingData,
  });

  const trackPwaPromptShown = useCustomEventTracker({
    eventName: 'pwa-prompt-shown',
    ...experimentTrackingData,
  });
  const trackPwaPromptAccepted = useCustomEventTracker({
    eventName: 'pwa-prompt-accepted',
    ...experimentTrackingData,
  });
  const trackPwaPromptDismissed = useCustomEventTracker({
    eventName: 'pwa-prompt-dismissed',
    ...experimentTrackingData,
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

  if (
    !isVisible ||
    !isInstallable ||
    !promotionalBanner?.primaryButton?.text ||
    !promotionalBanner?.secondaryButton?.text
  ) {
    return null;
  }

  return (
    <div {...viewTracker}>
      <PromotionalBanner
        title={promotionalBanner.title}
        description={promotionalBanner.description}
        buttonSeparatorText={promotionalBanner.buttonSeparatorText}
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
  const pwaPromoBannerVariant = useExperimentVariation({
    experimentName: pwaPromoBannerExperimentName,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  if (isLite || isAmp || isPWA || !isAndroid) {
    return null;
  }

  if (pwaPromoBannerVariant === 'control') {
    return (
      <PWAPromotionalBannerControl experimentVariant={pwaPromoBannerVariant} />
    );
  }

  if (pwaPromoBannerVariant === 'on') {
    return (
      <PWAPromotionalBannerTreatment
        experimentVariant={pwaPromoBannerVariant}
      />
    );
  }

  return null;
};

export default PWAPromotionalBanner;
