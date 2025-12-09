import { useState, use } from 'react';
import usePWAInstallPrompt from '#app/hooks/usePWAInstallPrompt';
import PromotionalBanner from '#app/components/PromotionalBanner';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';

const PWA_BANNER_DISMISS_KEY = 'pwa_promotionalBanner_dismissals';
const PWA_BANNER_LAST_DISMISS_KEY = 'pwa_promotionalBanner_last_dismissed';
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

const PWAPromotionalBanner = () => {
  const { promotionalBanner } = use(ServiceContext);
  const { isLite, isAmp } = use(RequestContext);

  const [isVisible, setIsVisible] = useState(() => isBannerVisible());

  const handleBannerDismiss = () => {
    setBannerDismissed();
    setIsVisible(false);
  };

  // EXPERIMENT: PWA Promotional Banner
  const pwaPromoBannerExperimentName = 'newswb_ws_pwa_promo_prompt';
  const pwaPromoBannerVariant = useOptimizelyVariation({
    experimentName: pwaPromoBannerExperimentName,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  const isExperimentEnabled = Boolean(pwaPromoBannerVariant);

  // TODO: TEMP for testing
  // eslint-disable-next-line no-console
  console.log(`PWAPromotionalBanner`, {
    pwaPromoBannerExperimentName,
    pwaPromoBannerVariant,
    isExperimentEnabled,
  });

  const { promptInstall, isInstallable } = usePWAInstallPrompt({
    onAccepted: handleBannerDismiss,
    onDismissed: handleBannerDismiss,
    onError: () => setIsVisible(false),
  });

  if (
    isLite ||
    isAmp ||
    !isExperimentEnabled ||
    !isVisible ||
    !isInstallable ||
    !promotionalBanner
  ) {
    return null;
  }

  return (
    <PromotionalBanner
      title={promotionalBanner.title}
      description={promotionalBanner.description}
      orText={promotionalBanner.orText}
      primaryButton={{
        text: promotionalBanner.primaryButton.text,
        longText: promotionalBanner.primaryButton.longText,
      }}
      onPrimaryClick={promptInstall}
      secondaryButton={{
        text: promotionalBanner.secondaryButton.text,
      }}
      onSecondaryClick={handleBannerDismiss}
      isDismissible
      onClose={handleBannerDismiss}
      bannerLabel={promotionalBanner.bannerLabel}
    />
  );
};
export default PWAPromotionalBanner;
