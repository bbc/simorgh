import { useRef, useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

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

const usePWAInstallPrompt = () => {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isPwaPromoBannerVisible, setIsPwaPromoBannerVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const nav = window.navigator as Navigator & { standalone?: boolean };
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      Boolean(nav.standalone);

    if (isStandalone) {
      setIsInstallable(false);
      setIsPwaPromoBannerVisible(false);
      return undefined;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      if (typeof event.preventDefault === 'function') event.preventDefault();
      deferredPrompt.current = event as BeforeInstallPromptEvent;
      setIsInstallable(true);
    };

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt as EventListener,
      {
        once: true,
      },
    );
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt as EventListener,
      );
    };
  }, []);

  useEffect(() => {
    if (isInstallable) {
      const shouldShowBanner = isBannerVisible();
      setIsPwaPromoBannerVisible(shouldShowBanner);
    } else {
      setIsPwaPromoBannerVisible(false);
    }
  }, [isInstallable]);

  const promptInstall = () => {
    if (!deferredPrompt.current) return;
    deferredPrompt.current.prompt();
    deferredPrompt.current.userChoice
      .then(({ outcome }) => {
        if (outcome === 'dismissed') setBannerDismissed();
      })
      .finally(() => {
        deferredPrompt.current = null;
        setIsPwaPromoBannerVisible(false);
        setIsInstallable(false);
      });
  };

  const dismissBanner = () => {
    setBannerDismissed();
    setIsPwaPromoBannerVisible(false);
  };

  return {
    isPwaPromoBannerVisible,
    promptInstall,
    dismissBanner,
  };
};

export default usePWAInstallPrompt;
