import { useEffect } from 'react';
import useNetworkStatusTracker from '../useNetworkStatusTracker';
import useCustomEventTracker from '../useCustomEventTracker';
import { OFFLINE_VISIT_FLAG } from '../useOfflinePageFlag';

const OFFLINE_PAGE_VIEW_EVENT_NAME = 'pwa-offline-page-view';

/**
 * Tracks offline→online transitions after user has visited offline page.
 * Fires when network comes back online while flag is set.
 *
 * Flag can only be set in PWA mode (offline page requires service worker).
 * By not checking isPWA at dispatch time, we track each offline session separately
 * even if user switches between PWA/browser modes during reconnection.
 * This prevents data loss and ensures accurate analytics.
 */
const usePWAOfflineTracking = () => {
  const { isOnline, networkType } = useNetworkStatusTracker();

  const trackOfflinePageViewEvent = useCustomEventTracker({
    eventName: OFFLINE_PAGE_VIEW_EVENT_NAME,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !isOnline) {
      return;
    }
    // Adding console logs to help debug event tracking issues - will remove later
    // eslint-disable-next-line no-console
    console.log('usePWAOfflineTracking: Online detected, checking flag.');

    try {
      const offlineVisitFlag = localStorage.getItem(OFFLINE_VISIT_FLAG);

      if (offlineVisitFlag !== 'true') {
        return;
      }
      // Adding console logs to help debug event tracking issues - will remove later
      // eslint-disable-next-line no-console
      console.log(
        'usePWAOfflineTracking: Offline visit flag found, tracking event.',
        { networkType, isOnline },
      );

      trackOfflinePageViewEvent(networkType);
      localStorage.removeItem(OFFLINE_VISIT_FLAG);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('usePWAOfflineTracking', error);
    }
  }, [isOnline, networkType, trackOfflinePageViewEvent]);
};

export default usePWAOfflineTracking;
