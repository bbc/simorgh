import { useEffect } from 'react';

const useMediaQuery = (query, handler) => {
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    handler(mediaQueryList);

    mediaQueryList.addEventListener('change', handler);
    return () => mediaQueryList.removeEventListener('change', handler);
  }, [query, handler]);
};

export default useMediaQuery;
