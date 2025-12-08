import { useState, useEffect } from 'react';

/**
 * A hook to determine if the application is running in a PWA display mode.
 * @returns {boolean} True if the app is running in a PWA display mode, false otherwise.
 */

const useIsPWA = (): boolean => {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isStandalone = window.matchMedia(
        '(display-mode: standalone)',
      ).matches;
      const isMinimalUi = window.matchMedia(
        '(display-mode: minimal-ui)',
      ).matches;

      const isFullscreen = window.matchMedia(
        '(display-mode: fullscreen)',
      ).matches;
      const isWindowControlsOverlay = window.matchMedia(
        '(display-mode: window-controls-overlay)',
      ).matches;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isIOSStandalone = (window.navigator as any)?.standalone === true;

      const pwaStatus =
        isStandalone ||
        isMinimalUi ||
        isIOSStandalone ||
        isFullscreen ||
        isWindowControlsOverlay;

      setIsPWA(pwaStatus);

      // Store PWA status for offline page tracking
      try {
        localStorage.setItem('bbc_is_pwa', JSON.stringify(pwaStatus));
      } catch (err) {
        // Ignore localStorage errors
      }
    }
  }, []);

  return isPWA;
};

export default useIsPWA;
