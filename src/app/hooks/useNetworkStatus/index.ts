import { useEffect, useState } from 'react';

type NetworkSource = 'browser';

export type NetworkStatus = {
  isOnline: boolean;
  source: NetworkSource;
};

// main
const useNetworkStatus = (): NetworkStatus => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );
  const [source, setSource] = useState<NetworkSource>('browser');

  useEffect(() => {
    const onOnline = () => {
      setIsOnline(true);
      setSource('browser');
    };
    const onOffline = () => {
      setIsOnline(false);
      setSource('browser');
    };
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  return { isOnline, source };
};

export default useNetworkStatus;
