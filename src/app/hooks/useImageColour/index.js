import { useCallback, useMemo, useSyncExternalStore } from 'react';
import ColorThief from './colorthief';

import { selectColour } from './utils';

const initialSnapshot = { palette: null, isLoading: true, error: null };
const getServerSnapshot = () => initialSnapshot;

const createImageColourStore = () => {
  let snapshot = initialSnapshot;

  return {
    getSnapshot: () => snapshot,
    subscribe: (url, paletteSize, listener) => {
      let active = true;
      let img;
      snapshot = { ...snapshot, isLoading: true };
      listener();

      const handleError = () => {
        if (!active) return;
        snapshot = {
          url,
          paletteSize,
          palette: null,
          isLoading: false,
          error: true,
        };
        listener();
      };

      const handleLoad = () => {
        if (!active) return;
        let palette;
        try {
          const colorThief = new ColorThief();
          palette = colorThief.getPalette(img, paletteSize);
        } catch (error) {
          handleError();
          return;
        }
        snapshot = { url, paletteSize, palette, isLoading: false, error: null };
        listener();
      };

      try {
        img = new Image();
        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleError);
        img.crossOrigin = 'Anonymous';
        img.src = url;
      } catch (error) {
        handleError();
      }

      return () => {
        active = false;
        img?.removeEventListener('load', handleLoad);
        img?.removeEventListener('error', handleError);
      };
    },
  };
};

const useImageColour = (
  url,
  {
    fallbackColour = '#000000',
    minimumContrast = 0,
    contrastColour = '#ffffff',
    paletteSize = 10,
  } = {},
) => {
  const store = useMemo(() => createImageColourStore(), []);
  const subscribe = useCallback(
    listener => store.subscribe(url, paletteSize, listener),
    [store, url, paletteSize],
  );
  const snapshot = useSyncExternalStore(
    subscribe,
    store.getSnapshot,
    getServerSnapshot,
  );
  const { palette, error } = snapshot;

  return {
    colour: selectColour({
      palette,
      minimumContrast,
      contrastColour,
      fallbackColour,
    }),
    isLoading:
      snapshot.isLoading ||
      snapshot.url !== url ||
      snapshot.paletteSize !== paletteSize,
    error,
  };
};

export default useImageColour;
