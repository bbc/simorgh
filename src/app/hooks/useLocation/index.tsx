import { useSyncExternalStore } from 'react';

const serverLocation = { search: '' } as Location;
const getServerSnapshot = () => null;
const getSnapshot = () => window.location.href;
const subscribe = (listener: () => void) => {
  window.addEventListener('popstate', listener);
  window.addEventListener('hashchange', listener);
  return () => {
    window.removeEventListener('popstate', listener);
    window.removeEventListener('hashchange', listener);
  };
};

const useLocation = () => {
  const href = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return href === null ? serverLocation : window.location;
};

export default useLocation;
