import { useEffect } from 'react';
import useIsPWA from '../useIsPWA';
import useNetworkStatusTracker from '../useNetworkStatusTracker';

const OFFLINE_VISIT_FLAG = 'offline_page_visit';

/**
 * Sets a flag in localStorage when user visits the offline page in PWA mode.
 * This flag is checked by usePWAOfflineTracking to send tracking when back online.
 * Only tracks when app is running as PWA.
 */
const useOfflinePageFlag = () => {
  const isPWA = useIsPWA();
  const { isOnline } = useNetworkStatusTracker();
  console.log('useOfflinePageFlag invoked', { isPWA, isOnline });

  useEffect(() => {
    if (typeof window === 'undefined' || !isPWA) return;

    try {
      localStorage.setItem(OFFLINE_VISIT_FLAG, 'true');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('useOfflinePageFlag', error);
    }
  }, [isPWA]);
};

export default useOfflinePageFlag;
export { OFFLINE_VISIT_FLAG };
