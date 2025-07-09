import { useEffect } from 'react';
import useCustomEventTracker from '../useCustomEventTracker';

/**
 * NOTE: POC hook
 * A hook to track network connection details (effectiveType) using Reverb Analytics
 * Fires once (on mount)
 * TODO: Potentially introduce sessionStorage session to track once per session?
 */
const useNetworkConnectionTracker = () => {
  const { trackEvent } = useCustomEventTracker({
    componentName: 'useNetworkConnectionTracker',
    eventName: 'effectiveType',
  });

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { connection } = navigator as any;

      if (connection?.effectiveType) {
        const customData = {
          effectiveType: connection.effectiveType || null,
          downlink: connection.downlink || null,
        };

        // TODO: Temp
        console.log(`useNetworkConnectionTracker`, { customData });

        trackEvent({
          customData,
        });
      }
    }
  }, [trackEvent]);
};

export default useNetworkConnectionTracker;
