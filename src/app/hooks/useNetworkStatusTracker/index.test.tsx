import { renderHook, act } from '@testing-library/react';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useNetworkStatus from './index';
import { EffectiveNetworkType } from './type';

describe('useNetworkStatus', () => {
  const originalNavigator = window.navigator;

  afterEach(() => {
    window.navigator = originalNavigator;
    jest.restoreAllMocks();
  });

  const mockNavigator = (
    onLine: boolean,
    effectiveType?: EffectiveNetworkType,
  ) => {
    const connection = effectiveType
      ? {
          effectiveType,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        }
      : undefined;

    jest.spyOn(window, 'navigator', 'get').mockImplementation(
      () =>
        ({
          onLine,
          connection,
        }) as unknown as Navigator,
    );

    return connection;
  };

  it('returns online status with network type when user is online', () => {
    mockNavigator(true, '4g');
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toEqual({
      isOnline: true,
      networkType: '4g',
    });
  });

  it('returns offline status when user is offline', () => {
    mockNavigator(false);
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toEqual({
      isOnline: false,
      networkType: 'unknown',
    });
  });

  it('returns unknown network type when connection API is not available', () => {
    mockNavigator(true);
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toEqual({
      isOnline: true,
      networkType: 'unknown',
    });
  });

  it('defaults to online when rendered on server side', () => {
    const { result } = renderSSRHook(() => useNetworkStatus());

    expect(result.current).toEqual({
      isOnline: true,
      networkType: 'unknown',
    });
  });

  it.each([
    ['slow-2g', 'slow-2g'],
    ['2g', '2g'],
    ['3g', '3g'],
    ['4g', '4g'],
    ['5g', '5g'],
  ] as const)('detects %s network type', (effectiveType, expectedType) => {
    mockNavigator(true, effectiveType);
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current.networkType).toBe(expectedType);
  });

  it('returns unknown for invalid network types', () => {
    const connection = {
      effectiveType: 'invalid-type',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    jest.spyOn(window, 'navigator', 'get').mockImplementation(
      () =>
        ({
          onLine: true,
          connection,
        }) as unknown as Navigator,
    );

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current.networkType).toBe('unknown');
  });

  it('updates to online when online event is fired', () => {
    mockNavigator(false);
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current.isOnline).toBe(false);

    act(() => {
      mockNavigator(true, '4g');
      window.dispatchEvent(new Event('online'));
    });

    expect(result.current.isOnline).toBe(true);
    expect(result.current.networkType).toBe('4g');
  });

  it('updates to offline when offline event is fired', () => {
    mockNavigator(true, '4g');
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current.isOnline).toBe(true);

    act(() => {
      mockNavigator(false);
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current.isOnline).toBe(false);
  });

  it('updates network type when connection change event is fired', () => {
    const connection = mockNavigator(true, '3g');
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current.networkType).toBe('3g');

    act(() => {
      mockNavigator(true, '4g');
      const changeHandler = connection?.addEventListener.mock.calls.find(
        call => call[0] === 'change',
      )?.[1];
      changeHandler?.();
    });

    expect(result.current.networkType).toBe('4g');
    expect(result.current.isOnline).toBe(true);
  });

  it('registers connection change listener when connection API is available', () => {
    const connection = mockNavigator(true, '4g');
    renderHook(() => useNetworkStatus());

    expect(connection?.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });

  it('does not throw when connection API is not available', () => {
    mockNavigator(true);
    expect(() => renderHook(() => useNetworkStatus())).not.toThrow();
  });

  it('removes event listeners on unmount', () => {
    const connection = mockNavigator(true, '4g');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useNetworkStatus());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'online',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'offline',
      expect.any(Function),
    );

    if (connection) {
      expect(connection.removeEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      );
    }
  });

  it('handles cleanup when connection API is not available', () => {
    mockNavigator(true);
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useNetworkStatus());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'online',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'offline',
      expect.any(Function),
    );
  });
});
