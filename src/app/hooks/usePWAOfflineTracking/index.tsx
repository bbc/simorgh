import { useEffect, useRef } from 'react';
import useIsPWA from '../useIsPWA';
import useNetworkStatusTracker from '../useNetworkStatusTracker';
import useCustomEventTracker from '../useCustomEventTracker';
import { OFFLINE_VISIT_FLAG } from '../useOfflinePageFlag';

const OFFLINE_PAGE_VIEW_EVENT_NAME = 'pwa-offline-page-view';

/**
 * Tracks offline→online transitions in PWA mode after user has visited offline page.
 * Fires when network comes back online while flag is set.
 * Flag is set by useOfflinePageFlag when user visits offline page while offline.
 */
const usePWAOfflineTracking = () => {
  const isPWA = useIsPWA();
  const { isOnline, networkType } = useNetworkStatusTracker();
  const prevIsOnlineRef = useRef(isOnline);

  const trackOfflinePageViewEvent = useCustomEventTracker({
    eventName: OFFLINE_PAGE_VIEW_EVENT_NAME,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !isPWA) {
      prevIsOnlineRef.current = isOnline;
      return;
    }

    if (!isOnline) {
      prevIsOnlineRef.current = isOnline;
      return;
    }

    try {
      const offlineVisitFlag = localStorage.getItem(OFFLINE_VISIT_FLAG);

      if (offlineVisitFlag !== 'true') {
        return;
      }

      trackOfflinePageViewEvent(networkType);
      localStorage.removeItem(OFFLINE_VISIT_FLAG);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('usePWAOfflineTracking', error);
    }

    prevIsOnlineRef.current = isOnline;
  }, [isPWA, isOnline, networkType, trackOfflinePageViewEvent]);
};

export default usePWAOfflineTracking;
