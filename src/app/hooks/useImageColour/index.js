import { useState, useEffect } from 'react';
import Vibrant from 'node-vibrant';

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

  useEffect(() => {
    try {
      setIsLoading(true);
      Vibrant.from(url)
        .getPalette()
        .then(output => {
          setPalette(output);
          setIsLoading(false);
          setError(null);
        })
        .catch(setErrorState);
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
