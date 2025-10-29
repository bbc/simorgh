import { useEffect, useRef, useCallback } from 'react';
import useNetworkStatusTracker from '../useNetworkStatusTracker';
import useCustomEventTracker from '../useCustomEventTracker';
import { NetworkStatus } from '../useNetworkStatusTracker/type';

const ONLINE_EVENT_NAME = 'network-connection-online';
const OFFLINE_EVENT_NAME = 'network-connection-offline';
const NETWORK_TYPE_EVENT_NAME = 'network-effective-type';
const DEBOUNCE_DELAY = 5000;

/**
 * A specialized hook for tracking network connection status changes.
 * Tracks network type on page load and online/offline status changes.
 * Uses debouncing for online and offline events to prevent excessive event firing during rapid connection changes.
 */

const useConnectionEventTracker = () => {
  const networkStatus = useNetworkStatusTracker();

  const trackOnlineEvent = useCustomEventTracker({
    eventName: ONLINE_EVENT_NAME,
  });
  const trackOfflineEvent = useCustomEventTracker({
    eventName: OFFLINE_EVENT_NAME,
  });
  const trackNetworkTypeEvent = useCustomEventTracker({
    eventName: NETWORK_TYPE_EVENT_NAME,
  });

  const initializedRef = useRef(false);
  const previousOnlineStatusRef = useRef<boolean>(true); // Assume online on mount
  const lastOfflineEventTimeRef = useRef<number>(0);
  const lastOnlineEventTimeRef = useRef<number>(0);

  const handleOnlineStatusChange = useCallback(
    (currentStatus: NetworkStatus) => {
      const now = Date.now();
      const hasOnlineStatusChanged =
        previousOnlineStatusRef.current !== currentStatus.isOnline;
      const timeSinceLastOnlineEvent = now - lastOnlineEventTimeRef.current;
      const timeSinceLastOfflineEvent = now - lastOfflineEventTimeRef.current;

      if (!hasOnlineStatusChanged) return;

      if (
        currentStatus.isOnline &&
        timeSinceLastOnlineEvent >= DEBOUNCE_DELAY
      ) {
        lastOnlineEventTimeRef.current = now;
        previousOnlineStatusRef.current = true;
        // Track network type to identify the connection quality user returned with (e.g., 4g, 3g, slow-2g)
        trackOnlineEvent(currentStatus.networkType);
        return;
      }

      // Going offline
      if (
        !currentStatus.isOnline &&
        timeSinceLastOfflineEvent >= DEBOUNCE_DELAY
      ) {
        lastOfflineEventTimeRef.current = now;
        previousOnlineStatusRef.current = false;
        trackOfflineEvent();
      }
    },
    [trackOnlineEvent, trackOfflineEvent],
  );

  // Track network type on initial load
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;

      if (networkStatus.networkType) {
        trackNetworkTypeEvent(networkStatus.networkType);
      }
    }
  }, [networkStatus, trackNetworkTypeEvent]);

  // Track only online/offline changes during session
  useEffect(() => {
    if (!initializedRef.current) {
      return;
    }

    handleOnlineStatusChange(networkStatus);
  }, [networkStatus.isOnline, handleOnlineStatusChange, networkStatus]);
};

export default useConnectionEventTracker;
