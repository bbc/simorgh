import { useState, useCallback } from 'react';
import useMediaQuery from '../useMediaQuery';

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const handleChange = useCallback(mediaQueryList => {
    setPrefersReducedMotion(mediaQueryList.matches);
  }, []);

  useMediaQuery('(prefers-reduced-motion: reduce)', handleChange);

  return prefersReducedMotion;
};

export default usePrefersReducedMotion;
