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

      (async () =>
        setIsPWA(
          isStandalone ||
            isMinimalUi ||
            isIOSStandalone ||
            isFullscreen ||
            isWindowControlsOverlay,
        ))();
    }
  }, []);

  return isPWA;
};

export default useIsPWA;
