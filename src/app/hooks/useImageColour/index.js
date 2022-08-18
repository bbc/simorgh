import { useState, useEffect } from 'react';
import ColorThief from './colorthief';

import { selectColour } from './utils';

const useImageColour = (
  url,
  {
    fallbackColour = '#000000',
    minimumContrast = 0,
    contrastColour = '#ffffff',
    paletteSize = 10,
  } = {},
) => {
  const [palette, setPalette] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const setErrorState = () => {
    setPalette(null);
    setError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      setIsLoading(true);

      const colorThief = new ColorThief();
      const img = new Image();
      img.addEventListener('load', () => {
        setPalette(colorThief.getPalette(img, paletteSize));
        setIsLoading(false);
        setError(null);
      });

      img.addEventListener('error', setErrorState);
      img.crossOrigin = 'Anonymous';
      img.src = url;
    } catch (err) {
      setErrorState();
    }
  }, [url, paletteSize]);

  return {
    colour: selectColour({
      palette,
      minimumContrast,
      contrastColour,
      fallbackColour,
    }),
    isLoading,
    error,
  };
};

export default useImageColour;
