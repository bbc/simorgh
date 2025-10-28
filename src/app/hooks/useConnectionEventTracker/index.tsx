import { useEffect, useRef, useCallback } from 'react';
import useNetworkStatusTracker from '../useNetworkStatusTracker';
import useCustomEventTracker from '../useCustomEventTracker';
import { NetworkStatus } from '../useNetworkStatusTracker/type';

const ONLINE_EVENT_NAME = 'network-connection-online';
const OFFLINE_EVENT_NAME = 'network-connection-offline';
const NETWORK_TYPE_EVENT_NAME = 'network-effective-type';
const STORAGE_KEY = 'simorgh-network-status';

interface StoredNetworkData {
  networkType: string;
  isOnline: boolean;
  timestamp: number;
}

const getStoredNetworkData = (): StoredNetworkData | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to read network status from localStorage:', error);
    return null;
  }
};

const storeNetworkData = (data: StoredNetworkData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to store network status to localStorage:', error);
  }
};

/**
 * A specialized hook for tracking network connection status changes.
 * Tracks network type only on page load and online/offline status changes during session.
 * Uses localStorage to persist network state between sessions.
 *
 * @returns {Object} An object containing connection status tracking functionality
 */
const useConnectionEventTracker = (): object => {
  const networkStatus = useNetworkStatusTracker();

  const { trackEvent: trackOnlineEvent } = useCustomEventTracker({
    eventName: ONLINE_EVENT_NAME,
  });
  const { trackEvent: trackOfflineEvent } = useCustomEventTracker({
    eventName: OFFLINE_EVENT_NAME,
  });
  const { trackEvent: trackNetworkTypeEvent } = useCustomEventTracker({
    eventName: NETWORK_TYPE_EVENT_NAME,
  });

  const initializedRef = useRef(false);

  const handleOnlineStatusChange = useCallback(
    (currentStatus: NetworkStatus, storedData: StoredNetworkData | null) => {
      // TODO: should we still track it if storedData is missing?
      // TODO - add debounce;
      if (!storedData) return;

      const hasOnlineStatusChanged =
        storedData.isOnline !== currentStatus.isOnline;

      if (hasOnlineStatusChanged) {
        if (currentStatus.isOnline) {
          // Back online - pass effective type
          trackOnlineEvent(currentStatus.networkType);
        } else {
          // Going offline
          trackOfflineEvent();
        }

        // Update localStorage;
        storeNetworkData({
          networkType: currentStatus.networkType,
          isOnline: currentStatus.isOnline,
          timestamp: Date.now(),
        });
      }
    },
    [trackOnlineEvent, trackOfflineEvent],
  );

  // Track network type only on initial load
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;

      // Track network type only on page load
      if (networkStatus.networkType) {
        trackNetworkTypeEvent(networkStatus.networkType);
      }

      // Store initial data
      storeNetworkData({
        networkType: networkStatus.networkType,
        isOnline: networkStatus.isOnline,
        timestamp: Date.now(),
      });
    }
  }, [networkStatus, trackNetworkTypeEvent]);

  // Track only online/offline changes during session
  useEffect(() => {
    if (!initializedRef.current) {
      return;
    }

    const storedData = getStoredNetworkData();
    handleOnlineStatusChange(networkStatus, storedData);
  }, [networkStatus.isOnline, handleOnlineStatusChange, networkStatus]);

  return {
    currentStatus: networkStatus,
    isOnline: networkStatus.isOnline,
    networkType: networkStatus.networkType,
  };
};

export default useConnectionEventTracker;
