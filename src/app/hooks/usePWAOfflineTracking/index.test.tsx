import { renderHook } from '@testing-library/react';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import usePWAOfflineTracking from './index';
import useIsPWA from '../useIsPWA';
import useNetworkStatusTracker from '../useNetworkStatusTracker';
import useCustomEventTracker from '../useCustomEventTracker';

jest.mock('../useIsPWA');
jest.mock('../useNetworkStatusTracker');
jest.mock('../useCustomEventTracker');

describe('usePWAOfflineTracking', () => {
  const mockTrackOfflinePageViewEvent = jest.fn();
  const mockUseIsPWA = useIsPWA as jest.MockedFunction<typeof useIsPWA>;
  const mockUseNetworkStatusTracker =
    useNetworkStatusTracker as jest.MockedFunction<
      typeof useNetworkStatusTracker
    >;
  const mockUseCustomEventTracker =
    useCustomEventTracker as jest.MockedFunction<typeof useCustomEventTracker>;

  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();

    mockUseCustomEventTracker.mockReturnValue(mockTrackOfflinePageViewEvent);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should not fire event when not in PWA mode', () => {
    mockUseIsPWA.mockReturnValue(false);
    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: true,
      networkType: '4g',
    });

    renderHook(() => usePWAOfflineTracking());

    expect(mockTrackOfflinePageViewEvent).not.toHaveBeenCalled();
  });

  it('should not fire event when offline flag is not set', () => {
    mockUseIsPWA.mockReturnValue(true);
    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: true,
      networkType: '4g',
    });
    Storage.prototype.getItem = jest.fn().mockReturnValue(null);

    renderHook(() => usePWAOfflineTracking());

    expect(mockTrackOfflinePageViewEvent).not.toHaveBeenCalled();
  });

  it('should fire event when in PWA mode, online, and flag is set', () => {
    mockUseIsPWA.mockReturnValue(true);
    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: true,
      networkType: '4g',
    });
    Storage.prototype.getItem = jest.fn().mockReturnValue('true');

    renderHook(() => usePWAOfflineTracking());

    expect(mockTrackOfflinePageViewEvent).toHaveBeenCalledTimes(1);
    expect(mockTrackOfflinePageViewEvent).toHaveBeenCalledWith('4g');
    expect(localStorage.removeItem).toHaveBeenCalledWith('offline_page_visit');
  });

  it('should fire event on offline→online transition', () => {
    mockUseIsPWA.mockReturnValue(true);
    Storage.prototype.getItem = jest.fn().mockReturnValue('true');

    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: false,
      networkType: 'unknown',
    });

    const { rerender } = renderHook(() => usePWAOfflineTracking());

    expect(mockTrackOfflinePageViewEvent).not.toHaveBeenCalled();

    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: true,
      networkType: '4g',
    });

    rerender();

    expect(mockTrackOfflinePageViewEvent).toHaveBeenCalledTimes(1);
    expect(mockTrackOfflinePageViewEvent).toHaveBeenCalledWith('4g');
    expect(localStorage.removeItem).toHaveBeenCalledWith('offline_page_visit');
  });

  it('should not fire event again without flag being set', () => {
    mockUseIsPWA.mockReturnValue(true);
    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: true,
      networkType: '4g',
    });
    const mockGetItem = jest
      .fn()
      .mockReturnValueOnce('true')
      .mockReturnValue(null);
    Storage.prototype.getItem = mockGetItem;

    const { rerender } = renderHook(() => usePWAOfflineTracking());

    expect(mockTrackOfflinePageViewEvent).toHaveBeenCalledTimes(1);

    rerender();

    expect(mockTrackOfflinePageViewEvent).toHaveBeenCalledTimes(0);
  });

  it('should fire event again after flag is set again on next offline visit', () => {
    mockUseIsPWA.mockReturnValue(true);
    const mockGetItem = jest
      .fn()
      .mockReturnValueOnce('true')
      .mockReturnValueOnce('true');
    Storage.prototype.getItem = mockGetItem;

    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: false,
      networkType: 'unknown',
    });

    const { rerender } = renderHook(() => usePWAOfflineTracking());

    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: true,
      networkType: '4g',
    });

    rerender();

    expect(mockTrackOfflinePageViewEvent).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenCalledWith('offline_page_visit');

    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: false,
      networkType: 'unknown',
    });

    rerender();

    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: true,
      networkType: '5g',
    });

    rerender();

    expect(mockTrackOfflinePageViewEvent).toHaveBeenCalledTimes(2);
    expect(mockTrackOfflinePageViewEvent).toHaveBeenLastCalledWith('5g');
    expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
  });

  it('should remove flag after firing event', () => {
    mockUseIsPWA.mockReturnValue(true);
    Storage.prototype.getItem = jest.fn().mockReturnValue('true');

    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: false,
      networkType: 'unknown',
    });

    const { rerender } = renderHook(() => usePWAOfflineTracking());

    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: true,
      networkType: '4g',
    });

    rerender();

    expect(mockTrackOfflinePageViewEvent).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenCalledWith('offline_page_visit');
  });

  it('should not fire when offline even if flag is set', () => {
    mockUseIsPWA.mockReturnValue(true);
    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: false,
      networkType: 'unknown',
    });
    Storage.prototype.getItem = jest.fn().mockReturnValue('true');

    renderHook(() => usePWAOfflineTracking());

    expect(mockTrackOfflinePageViewEvent).not.toHaveBeenCalled();
  });

  it('should handle localStorage errors gracefully', () => {
    mockUseIsPWA.mockReturnValue(true);
    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: true,
      networkType: '4g',
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    Storage.prototype.getItem = jest.fn().mockImplementation(() => {
      throw new Error('localStorage access denied');
    });

    expect(() => renderHook(() => usePWAOfflineTracking())).not.toThrow();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'usePWAOfflineTracking',
      expect.any(Error),
    );
    expect(mockTrackOfflinePageViewEvent).not.toHaveBeenCalled();
  });

  it('should not track on server side', () => {
    mockUseIsPWA.mockReturnValue(true);
    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: true,
      networkType: '4g',
    });
    Storage.prototype.getItem = jest.fn().mockReturnValue('true');

    renderSSRHook(() => usePWAOfflineTracking());

    expect(mockTrackOfflinePageViewEvent).not.toHaveBeenCalled();
  });

  it('should pass correct network type to tracking function', () => {
    mockUseIsPWA.mockReturnValue(true);
    Storage.prototype.getItem = jest.fn().mockReturnValue('true');

    const networkTypes = [
      'slow-2g',
      '2g',
      '3g',
      '4g',
      '5g',
      'unknown',
    ] as const;

    networkTypes.forEach(networkType => {
      jest.clearAllMocks();

      mockUseNetworkStatusTracker.mockReturnValue({
        isOnline: true,
        networkType,
      });

      renderHook(() => usePWAOfflineTracking());

      expect(mockTrackOfflinePageViewEvent).toHaveBeenCalledWith(networkType);
    });
  });

  it('should only fire on actual offline→online transition, not online→offline', () => {
    mockUseIsPWA.mockReturnValue(true);
    Storage.prototype.getItem = jest.fn().mockReturnValue('true');

    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: true,
      networkType: '4g',
    });

    const { rerender } = renderHook(() => usePWAOfflineTracking());

    expect(mockTrackOfflinePageViewEvent).toHaveBeenCalledTimes(1);

    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: false,
      networkType: 'unknown',
    });

    rerender();

    expect(mockTrackOfflinePageViewEvent).toHaveBeenCalledTimes(1);
  });
});
