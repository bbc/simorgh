import { useState, use, useCallback } from 'react';
import usePWAInstallPrompt from '#app/hooks/usePWAInstallPrompt';
import PromotionalBanner from '#app/components/PromotionalBanner';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import Experiment, { ExperimentType } from '#app/components/Experiment';
import useAndroidDetection from '#app/hooks/useAdroidDetection';
import useClickTracker from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import useCustomEventTracker from '#app/hooks/useCustomEventTracker';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import useIsPWA from '#app/hooks/useIsPWA';
import {
  PWA_PROMOTIONAL_BANNER_EXPERIMENT_NAME,
  PWA_PROMOTIONAL_BANNER_CONTROL,
  PWA_PROMOTIONAL_BANNER_TREATMENT,
} from './experiment';

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
  const { isInstallable } = usePWAInstallPrompt({ deferPrompt: false });
  const viewTracker = useViewTracker({
    componentName: 'pwa-promotional-banner',
    alwaysInView: true,
  });

  if (!isInstallable) {
    return null;
  }

  return <VisuallyHiddenText {...viewTracker} />;
};

// Treatment group - actual PWA banner
const PWAPromotionalBannerTreatment = () => {
  const { promotionalBanner } = use(ServiceContext);
  const [isVisible, setIsVisible] = useState(() => isBannerVisible());

  const viewTracker = useViewTracker({
    componentName: 'pwa-promotional-banner',
  });

  const { onClick: onPrimaryClickTrack } = useClickTracker({
    componentName: 'pwa-promotional-banner-primary',
  });
  const { onClick: onSecondaryClickTrack } = useClickTracker({
    componentName: 'pwa-promotional-banner-secondary',
  });
  const { onClick: onCloseClickTrack } = useClickTracker({
    componentName: 'pwa-promotional-banner-close',
  });

  const trackPwaPromptShown = useCustomEventTracker({
    eventName: 'pwa-prompt-shown',
  });
  const trackPwaPromptAccepted = useCustomEventTracker({
    eventName: 'pwa-prompt-accepted',
  });
  const trackPwaPromptDismissed = useCustomEventTracker({
    eventName: 'pwa-prompt-dismissed',
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

  const isEligible = !isLite && !isAmp && !isPWA && isAndroid;

  // Decided before the eligibility check, so every visitor reaching this
  // component is bucketed, as before.
  return (
    <Experiment
      name={PWA_PROMOTIONAL_BANNER_EXPERIMENT_NAME}
      type={ExperimentType.SERVER_SIDE}
    >
      {variation => {
        if (!isEligible) return null;
        if (variation === PWA_PROMOTIONAL_BANNER_CONTROL) {
          return <PWAPromotionalBannerControl />;
        }
        if (variation === PWA_PROMOTIONAL_BANNER_TREATMENT) {
          return <PWAPromotionalBannerTreatment />;
        }
        return null;
      }}
    </Experiment>
  );
};

export default PWAPromotionalBanner;
