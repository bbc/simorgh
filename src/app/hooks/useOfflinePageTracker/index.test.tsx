import { renderHook } from '@testing-library/react';
import useOfflinePageTracker, {
  getOfflineTrackingData,
  hasOfflinePageFlag,
  clearOfflinePageFlag,
} from '.';

const OFFLINE_PAGE_SHOWN_KEY = 'bbc_offline_page_shown';

jest.mock('#app/lib/utilities/getEffectiveNetworkType', () => ({
  __esModule: true,
  default: jest.fn(() => '4g'),
}));

describe('useOfflinePageTracker', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('useOfflinePageTracker hook', () => {
    it('should set offline tracking data in localStorage for PWA users', () => {
      // Set PWA status
      localStorage.setItem('bbc_is_pwa', 'true');

      renderHook(() => useOfflinePageTracker());

      const storedData = localStorage.getItem(OFFLINE_PAGE_SHOWN_KEY);
      expect(storedData).toBeTruthy();

      const parsed = JSON.parse(storedData!);
      expect(parsed).toHaveProperty('shown', true);
      expect(parsed).toHaveProperty('networkType', '4g');
      expect(parsed).toHaveProperty('timestamp');
      expect(typeof parsed.timestamp).toBe('number');
    });

    it('should not track non-PWA users', () => {
      // PWA status not set or false
      localStorage.setItem('bbc_is_pwa', 'false');

      renderHook(() => useOfflinePageTracker());

      const storedData = localStorage.getItem(OFFLINE_PAGE_SHOWN_KEY);
      expect(storedData).toBeNull();
    });

    it('should handle localStorage errors gracefully', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      // Mock getItem to return PWA status, then make setItem fail
      const originalSetItem = Storage.prototype.setItem;
      const originalGetItem = Storage.prototype.getItem;

      Storage.prototype.getItem = jest.fn(key => {
        if (key === 'bbc_is_pwa') return 'true';
        return null;
      });

      Storage.prototype.setItem = jest.fn(() => {
        throw new Error('localStorage unavailable');
      });

      renderHook(() => useOfflinePageTracker());

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[Offline Tracking] Failed to set offline flag:',
        expect.any(Error),
      );

      // Restore
      Storage.prototype.getItem = originalGetItem;
      Storage.prototype.setItem = originalSetItem;
      consoleErrorSpy.mockRestore();
    });
  });

  describe('getOfflineTrackingData', () => {
    it('should return tracking data when set', () => {
      const mockData = {
        shown: true,
        networkType: '3g',
        timestamp: 1234567890,
      };
      localStorage.setItem(OFFLINE_PAGE_SHOWN_KEY, JSON.stringify(mockData));

      const data = getOfflineTrackingData();
      expect(data).toEqual(mockData);
    });

    it('should return null when flag is not set', () => {
      expect(getOfflineTrackingData()).toBeNull();
    });

    it('should return null when localStorage has invalid JSON', () => {
      localStorage.setItem(OFFLINE_PAGE_SHOWN_KEY, 'invalid json');

      expect(getOfflineTrackingData()).toBeNull();
    });

    it('should return null when localStorage is unavailable', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('localStorage unavailable');
      });

      expect(getOfflineTrackingData()).toBeNull();
    });
  });

  describe('hasOfflinePageFlag', () => {
    it('should return true when tracking data exists', () => {
      const mockData = {
        shown: true,
        networkType: '4g',
        timestamp: 1234567890,
      };
      localStorage.setItem(OFFLINE_PAGE_SHOWN_KEY, JSON.stringify(mockData));

      expect(hasOfflinePageFlag()).toBe(true);
    });

    it('should return false when flag is not set', () => {
      expect(hasOfflinePageFlag()).toBe(false);
    });
  });

  describe('clearOfflinePageFlag', () => {
    it('should remove flag from localStorage', () => {
      localStorage.setItem(OFFLINE_PAGE_SHOWN_KEY, 'true');

      clearOfflinePageFlag();

      expect(localStorage.getItem(OFFLINE_PAGE_SHOWN_KEY)).toBeNull();
    });

    it('should handle localStorage errors gracefully', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const removeItemSpy = jest
        .spyOn(Storage.prototype, 'removeItem')
        .mockImplementation(() => {
          throw new Error('localStorage unavailable');
        });

      clearOfflinePageFlag();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[Offline Tracking] Failed to clear offline flag:',
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
      removeItemSpy.mockRestore();
    });
  });
});
