import { useEffect } from 'react';

const useMediaQuery = (query, handler) => {
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    handler(mediaQueryList);

    mediaQueryList.addEventListener(handler);
    return () => mediaQueryList.removeEventListener(handler);
  }, [query, handler]);
};

export default useMediaQuery;
