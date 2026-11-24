import { useEffect, useRef } from 'react';
import useNetworkStatusTracker from '../useNetworkStatusTracker';
import useCustomEventTracker from '../useCustomEventTracker';

const NETWORK_TYPE_EVENT_NAME = 'network-effective-type';

/**
 * A hook to track connection type using connection.effectiveType property
 */
const useConnectionTypeTracker = () => {
  const networkStatus = useNetworkStatusTracker();
  const hasTrackedRef = useRef(false);

  const trackNetworkTypeEvent = useCustomEventTracker({
    eventName: NETWORK_TYPE_EVENT_NAME,
  });

  useEffect(() => {
    if (hasTrackedRef.current) return;

    if (networkStatus.networkType) {
      trackNetworkTypeEvent(networkStatus.networkType);
      hasTrackedRef.current = true;
    }
  }, [networkStatus.networkType, trackNetworkTypeEvent]);
};

export default useConnectionTypeTracker;
