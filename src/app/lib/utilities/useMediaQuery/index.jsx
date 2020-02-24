import { useEffect } from 'react';

const useMediaQuery = (query, handler) => {
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    handler(mediaQueryList);

    mediaQueryList.addListener(handler);
    return () => mediaQueryList.removeListener(handler);
  }, [query, handler]);
};

export default useMediaQuery;
