import { useSyncExternalStore } from 'react';

const displayModes = [
  'standalone',
  'minimal-ui',
  'fullscreen',
  'window-controls-overlay',
];
const getMediaQueries = () =>
  displayModes.map(mode => window.matchMedia(`(display-mode: ${mode})`));

const getSnapshot = () =>
  getMediaQueries().some(
    query =>
      query.matches &&
      (query.media !== '(display-mode: fullscreen)' ||
        !document.fullscreenElement),
  ) ||
  (window.navigator as Navigator & { standalone?: boolean }).standalone ===
    true;

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
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export default useIsPWA;
