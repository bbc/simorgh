import { useState, useEffect } from 'react';
import getEffectiveNetworkType from '#app/lib/utilities/getEffectiveNetworkType';
import { NetworkStatus } from './type';

/**
 * A hook to monitor and provide real-time network connectivity status.
 * Tracks whether the user is online or offline and includes the effective network type.
 * @returns {NetworkStatus} An object containing isOnline (boolean), source ('browser'), and networkType (EffectiveNetworkType).
 */

const useNetworkStatusTracker = (): NetworkStatus => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>(() => {
    const isOnline =
      typeof window !== 'undefined' && navigator?.onLine !== undefined
        ? navigator.onLine
        : true;

    return {
      isOnline,
      networkType: getEffectiveNetworkType(),
    };
  });

  const handleOnline = () => {
    setNetworkStatus({
      isOnline: true,
      networkType: getEffectiveNetworkType(),
    });
  };

  const handleOffline = () => {
    setNetworkStatus({
      isOnline: false,
      networkType: getEffectiveNetworkType(),
    });
  };

  const handleConnectionChange = () => {
    setNetworkStatus(prevStatus => ({
      ...prevStatus,
      networkType: getEffectiveNetworkType(),
    }));
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const { connection } = navigator;

    if (connection?.addEventListener) {
      connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      if (connection?.removeEventListener) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return networkStatus;
};

export default useNetworkStatusTracker;
