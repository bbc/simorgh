import { useState, useSyncExternalStore } from 'react';

const displayModes = [
  'standalone',
  'minimal-ui',
  'fullscreen',
  'window-controls-overlay',
];
const getMediaQueries = () =>
  displayModes.map(mode => window.matchMedia(`(display-mode: ${mode})`));

const createGetSnapshot = () => {
  let lastIsPWA = false;

  return () => {
    // Native fullscreen temporarily replaces the app's display mode.
    if (!document.fullscreenElement) {
      lastIsPWA =
        getMediaQueries().some(query => query.matches) ||
        (window.navigator as Navigator & { standalone?: boolean })
          .standalone === true;
    }

    return lastIsPWA;
  };
};

const getServerSnapshot = () => false;

const subscribe = (listener: () => void) => {
  const mediaQueries = getMediaQueries();
  mediaQueries.forEach(query => {
    if (query.addEventListener) query.addEventListener('change', listener);
    else query.addListener(listener);
  });

  return () => {
    mediaQueries.forEach(query => {
      if (query.removeEventListener)
        query.removeEventListener('change', listener);
      else query.removeListener(listener);
    });
  };
};

/**
 * A hook to determine if the application is running in a PWA display mode.
 * @returns {boolean} True if the app is running in a PWA display mode, false otherwise.
 */

const useIsPWA = (): boolean => {
  const [getSnapshot] = useState(createGetSnapshot);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export default useIsPWA;
