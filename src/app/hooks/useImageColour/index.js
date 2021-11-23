import { useState, useEffect } from 'react';
import ColorThief from './colorthief';

import { selectColour } from './utils';

const getPalette = (url, count) =>
  new Promise((resolve, reject) => {
    const colorThief = new ColorThief();
    const img = new Image();

    img.addEventListener('load', () => {
      console.log('LOADED');
      resolve(colorThief.getPalette(img, count));
    });

    img.addEventListener('error', e => reject(e));
    img.crossOrigin = 'Anonymous';
    img.src = url;
  });

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

  useEffect(() => {
    try {
      setIsLoading(true);

      /*
        If we have to find a colour with a minimum contrast, we need to
        extract multiple colours from the image, to improve our chances
      */
      const coloursToExtract = minimumContrast <= 0 ? 1 : 10;

      getPalette(url, coloursToExtract).then(colours => {
        setPalette(colours);
        setIsLoading(false);
        setError(null);
      });
    } catch (err) {
      setErrorState();
    }
  }, [url, minimumContrast]);

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
