import { useEffect } from 'react';
import getEffectiveNetworkType from '#app/lib/utilities/getEffectiveNetworkType';

const OFFLINE_PAGE_SHOWN_KEY = 'bbc_offline_page_shown';

type OfflineTrackingData = {
  shown: boolean;
  networkType: string;
  timestamp: number;
};

/**
 * A hook to track when a user has been shown the offline page.
 * Sets a flag in localStorage when the offline page is rendered,
 * including network type and timestamp for analytics.
 * Based on WS-1838 requirements.
 */
const useOfflinePageTracker = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Only track PWA users (consistent with inline script)
      const isPWA = localStorage.getItem('bbc_is_pwa') === 'true';

      if (!isPWA) {
        // eslint-disable-next-line no-console
        console.warn('[Offline Tracking] Skipped - not PWA mode');
        return;
      }

      const trackingData: OfflineTrackingData = {
        shown: true,
        networkType: getEffectiveNetworkType(),
        timestamp: Date.now(),
      };

      // Store offline tracking data with network context
      localStorage.setItem(
        OFFLINE_PAGE_SHOWN_KEY,
        JSON.stringify(trackingData),
      );

      // eslint-disable-next-line no-console
      console.log(
        '[Offline Tracking] Offline page flag set for PWA user',
        trackingData,
      );
    } catch (err) {
      // localStorage might be unavailable in private browsing
      // eslint-disable-next-line no-console
      console.warn('[Offline Tracking] Failed to set offline flag:', err);
    }
  }, []);
};

/**
 * Get the offline tracking data if flag is set
 * @returns {OfflineTrackingData | null} Tracking data or null if not set
 */
export const getOfflineTrackingData = (): OfflineTrackingData | null => {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(OFFLINE_PAGE_SHOWN_KEY);
    if (!data) return null;

    return JSON.parse(data) as OfflineTrackingData;
  } catch {
    return null;
  }
};

/**
 * Check if the offline page flag is set
 * @returns {boolean} True if user was previously shown the offline page
 */
export const hasOfflinePageFlag = (): boolean => {
  return getOfflineTrackingData() !== null;
};

/**
 * Clear the offline page flag
 * Should be called after analytics have been sent
 */
export const clearOfflinePageFlag = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(OFFLINE_PAGE_SHOWN_KEY);
    // eslint-disable-next-line no-console
    console.log('[Offline Tracking] Offline page flag cleared');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[Offline Tracking] Failed to clear offline flag:', err);
  }
};

export default useOfflinePageTracker;
