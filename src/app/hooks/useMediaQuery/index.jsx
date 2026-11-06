import { useEffect } from 'react';
import subscribeToMediaQuery from './subscribeToMediaQuery';

const useMediaQuery = (query, handler) => {
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    handler(mediaQueryList);

    return subscribeToMediaQuery(mediaQueryList, handler);
  }, [query, handler]);
};

export default useMediaQuery;
