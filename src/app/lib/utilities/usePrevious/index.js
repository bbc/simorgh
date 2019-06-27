import { useRef, useEffect } from 'react';

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
