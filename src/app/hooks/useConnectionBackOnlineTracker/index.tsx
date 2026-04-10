import { useEffect, useRef, useCallback } from 'react';
import useNetworkStatusTracker from '../useNetworkStatusTracker';
import useCustomEventTracker from '../useCustomEventTracker';
import { NetworkStatus } from '../useNetworkStatusTracker/type';

const BACK_ONLINE_EVENT_NAME = 'network-connection-back-online';
const DEBOUNCE_DELAY = 10000;

/**
 * A hook for tracking network status transition from offline to online.
 */
const useConnectionBackOnlineTracker = () => {
  const { isOnline, networkType } = useNetworkStatusTracker();

  const trackBackOnlineEvent = useCustomEventTracker({
    eventName: BACK_ONLINE_EVENT_NAME,
  });

  const prevIsOnlineRef = useRef(true);
  const lastBackOnlineEventTimeRef = useRef(0);

  const handleStatusChange = useCallback(
    ({ isOnline: currentIsOnline, networkType: type }: NetworkStatus) => {
      const wasOnline = prevIsOnlineRef.current;

      if (wasOnline === currentIsOnline) {
        return;
      }

      const now = Date.now();
      const timeSinceLastBackOnline = now - lastBackOnlineEventTimeRef.current;
      const isPageVisible =
        typeof document !== 'undefined' &&
        document.visibilityState === 'visible';

      // Only track when transitioning from offline -> online and page is visible
      if (
        !wasOnline &&
        currentIsOnline &&
        isPageVisible &&
        timeSinceLastBackOnline >= DEBOUNCE_DELAY
      ) {
        lastBackOnlineEventTimeRef.current = now;
        trackBackOnlineEvent(type);
      }

      prevIsOnlineRef.current = currentIsOnline;
    },
    [trackBackOnlineEvent],
  );

  useEffect(() => {
    handleStatusChange({ isOnline, networkType });
  }, [handleStatusChange, isOnline, networkType]);
};

export default useConnectionBackOnlineTracker;
