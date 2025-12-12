import { useEffect, useRef } from 'react';
import useIsPWA from '../useIsPWA';
import useNetworkStatusTracker from '../useNetworkStatusTracker';
import useCustomEventTracker from '../useCustomEventTracker';
import { OFFLINE_VISIT_FLAG } from '../useOfflinePageTracker';

const OFFLINE_PAGE_VIEW_EVENT_NAME = 'offline-page-view';
const DEBOUNCE_DELAY = 10000;

/**
 * Tracks when a user who visited the offline page comes back online (PWA only).
 * Works in conjunction with useOfflinePageTracker which sets the flag.
 */
const usePWAOfflineTracking = () => {
  const isPWA = useIsPWA();
  const { isOnline, networkType } = useNetworkStatusTracker();

  const trackOfflinePageViewEvent = useCustomEventTracker({
    eventName: OFFLINE_PAGE_VIEW_EVENT_NAME,
  });

  const prevIsOnlineRef = useRef(true);
  const lastEventTimeRef = useRef(0);

  // Notify service worker about PWA mode
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        if (registration.active) {
          registration.active.postMessage({
            type: 'PWA_MODE',
            isPWA,
          });
        }
      });
    }
  }, [isPWA]);

  useEffect(() => {
    if (!isPWA) return;

    const wasOnline = prevIsOnlineRef.current;
    const now = Date.now();
    const timeSinceLastEvent = now - lastEventTimeRef.current;

    // Transitioned from offline to online
    if (!wasOnline && isOnline && timeSinceLastEvent >= DEBOUNCE_DELAY) {
      // Check if user visited offline page while offline
      try {
        const offlineVisitFlag = localStorage.getItem(OFFLINE_VISIT_FLAG);
        if (offlineVisitFlag === 'true') {
          // eslint-disable-next-line no-console
          console.warn(
            '🎯 PWA Offline Tra cking: User visited offline page, sending beacon...',
          );
          lastEventTimeRef.current = now;
          trackOfflinePageViewEvent(networkType);
          localStorage.removeItem(OFFLINE_VISIT_FLAG);
          // eslint-disable-next-line no-console
          console.warn('✅ PWA Offline Tracking: Beacon  sent, flag cleared');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
          'PWA Offline Tracking:  Error checking offline visit flag',
          error,
        );
      }
    }

    prevIsOnlineRef.current = isOnline;
  }, [isPWA, isOnline, networkType, trackOfflinePageViewEvent]);
};

export default usePWAOfflineTracking;
