import { useEffect } from 'react';

const useMediaQuery = (query, handler) => {
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    handler(mediaQueryList);

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handler);
    } else {
      mediaQueryList.addListener(handler);
    }
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handler);
      } else {
        mediaQueryList.removeListener(handler);
      }
    };
  }, [query, handler]);
};

export default useMediaQuery;
