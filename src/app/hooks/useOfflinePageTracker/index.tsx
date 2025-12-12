import { useEffect } from 'react';
import useIsPWA from '../useIsPWA';
import useNetworkStatusTracker from '../useNetworkStatusTracker';

const OFFLINE_VISIT_FLAG = 'bbc_offline_visit';

/**
 * Sets a flag in localStorage when user visits the offline page in PWA mode.
 * This flag is checked by useConnectionBackOnlineTracker to send tracking when back online.
 * Only tracks when app is running as PWA.
 */
const useOfflinePageTracker = () => {
  const isPWA = useIsPWA();
  const { isOnline } = useNetworkStatusTracker();
  useEffect(() => {
    if (typeof window === 'undefined' || !isPWA || !isOnline) return;

    try {
      localStorage.setItem(OFFLINE_VISIT_FLAG, 'true');
    } catch (error) {
      // Silently fail if localStorage is unavailable
    }
  }, [isOnline, isPWA]);
};

export default useOfflinePageTracker;
export { OFFLINE_VISIT_FLAG };
