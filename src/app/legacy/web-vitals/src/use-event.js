import { useRef, useEffect } from 'react';

const useEvent = (event, callbackFunction) => {
  const cb = useRef(callbackFunction);

  useEffect(() => {
    const callback = cb.current;

    window.addEventListener(event, callback);

    return () => window.removeEventListener(event, callback);
  }, [cb]);
};

export default useEvent;
