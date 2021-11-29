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

  // We extract 10 colours to give us more opportunity to find the most vibrant one
  const QUANTITY_OF_COLOURS_TO_EXTRACT = 10;

  useEffect(() => {
    try {
      setIsLoading(true);

      const colorThief = new ColorThief();
      const img = new Image();
      img.addEventListener('load', () => {
        setPalette(colorThief.getPalette(img, QUANTITY_OF_COLOURS_TO_EXTRACT));
        setIsLoading(false);
        setError(null);
      });

      img.addEventListener('error', setErrorState);
      img.crossOrigin = 'Anonymous';
      img.src = url;
    } catch (err) {
      setErrorState();
    }
  }, [url]);

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
