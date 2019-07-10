import { useRef, useEffect } from 'react';

/**
 * Custom React hook that returns the previous value of a prop.
 * similar usage to `prevProps` in `componentWillRecieveProps`,
 * ie `usePrevious(someProp)` returns `prevProps.someProp`.
 * Tracked prop is initialised to null
 * @param {Any} value of any given type
 */
const usePrevious = value => {
  const ref = useRef(null);
  useEffect(() => {
    return () => {
      ref.current = value;
    };
  }, [value]);
  return ref.current;
};

export default usePrevious;
