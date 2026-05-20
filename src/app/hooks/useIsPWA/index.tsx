import { useEffect, useState } from 'react';

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
      // biome-ignore lint/suspicious/noExplicitAny: we want this
      const isIOSStandalone = (window.navigator as any)?.standalone === true;

      setIsPWA(
        isStandalone ||
          isMinimalUi ||
          isIOSStandalone ||
          isFullscreen ||
          isWindowControlsOverlay,
      );
    }
  }, []);

  return isPWA;
};

export default useIsPWA;
