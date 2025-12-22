import { renderHook } from '@testing-library/react';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useOfflinePageFlag, { OFFLINE_VISIT_FLAG } from './index';

jest.mock('../useIsPWA');
jest.mock('../useNetworkStatusTracker');

const mockUseIsPWA = jest.requireMock('../useIsPWA').default as jest.Mock;
const mockUseNetworkStatusTracker = jest.requireMock(
  '../useNetworkStatusTracker',
).default as jest.Mock;

describe('useOfflinePageFlag', () => {
  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
    jest.clearAllMocks();
  });

  it('should set offline flag when offline in PWA mode', () => {
    mockUseIsPWA.mockReturnValue(true);
    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: false,
      networkType: '4g',
    });

    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).toHaveBeenCalledWith(
      OFFLINE_VISIT_FLAG,
      'true',
    );
  });

  it('should not set flag when online in PWA mode', () => {
    mockUseIsPWA.mockReturnValue(true);
    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: true,
      networkType: '4g',
    });

    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should not set flag when offline in browser mode', () => {
    mockUseIsPWA.mockReturnValue(false);
    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: false,
      networkType: '4g',
    });

    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should not set flag when online in browser mode', () => {
    mockUseIsPWA.mockReturnValue(false);
    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: true,
      networkType: '4g',
    });

    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should handle localStorage errors gracefully', () => {
    mockUseIsPWA.mockReturnValue(true);
    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: false,
      networkType: '4g',
    });
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    Storage.prototype.setItem = jest.fn().mockImplementation(() => {
      throw new Error('localStorage is full');
    });

    expect(() => renderHook(() => useOfflinePageFlag())).not.toThrow();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'useOfflinePageFlag',
      expect.any(Error),
    );
  });

  it('should not set flag on server side', () => {
    renderSSRHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should work with iOS standalone mode', () => {
    mockUseIsPWA.mockReturnValue(true);
    mockUseNetworkStatusTracker.mockReturnValue({
      isOnline: false,
      networkType: '4g',
    });

    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).toHaveBeenCalledWith(
      OFFLINE_VISIT_FLAG,
      'true',
    );
  });
});
