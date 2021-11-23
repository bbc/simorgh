import { useState, useEffect } from 'react';
import ColorThief from './colorthief';

import { selectColour } from './utils';

const useImageColour = (
  url,
  {
    fallbackColour = '#000000',
    minimumContrast = 0,
    contrastColour = '#ffffff',
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

  // If a minimumContrast value was set, we extract multiple colours from the
  // image to improve the chances we find one that meets the required ratio
  const quantityOfColoursToExtract = minimumContrast <= 0 ? 1 : 10;

  useEffect(() => {
    try {
      setIsLoading(true);

      const colorThief = new ColorThief();
      const img = new Image();
      img.addEventListener('load', () => {
        setPalette(colorThief.getPalette(img, quantityOfColoursToExtract));
        setIsLoading(false);
        setError(null);
      });

      img.addEventListener('error', setErrorState);
      img.crossOrigin = 'Anonymous';
      img.src = url;
    } catch (err) {
      setErrorState();
    }
  }, [url, quantityOfColoursToExtract]);

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
