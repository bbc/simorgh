import { useEffect } from 'react';
import useCustomEventTracker from '../useCustomEventTracker';

/**
 * NOTE: POC hook - used for testing only. To be removed before merging
 * A hook to track network connection details (effectiveType) using Reverb Analytics
 */
const useNetworkConnectionTracker = () => {
  const { trackEvent } = useCustomEventTracker({
    eventName: 'effectiveType',
  });

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { connection } = navigator as any;

      if (connection?.effectiveType) {
        const { effectiveType } = connection;
        const eventName = `effectiveType::${effectiveType}`;

        // TODO: Temp
        console.log(`useNetworkConnectionTracker`, { eventName });

        trackEvent(eventName);
      }
    }
  }, [trackEvent]);
};

export default useNetworkConnectionTracker;
