import { renderHook } from '@testing-library/react';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useOfflinePageFlag, { OFFLINE_VISIT_FLAG } from './index';

describe('useOfflinePageFlag', () => {
  const originalMatchMedia = window.matchMedia;
  const originalNavigator = window.navigator;
  const originalLocalStorage = window.localStorage;

  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    window.navigator = originalNavigator;
    window.localStorage = originalLocalStorage;
    jest.restoreAllMocks();
  });

  const mockMatchMedia = (queries: Record<string, boolean>) => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: !!queries[query],
    }));
  };

  const mockNavigator = (onLine: boolean) => {
    jest.spyOn(window, 'navigator', 'get').mockImplementation(
      () =>
        ({
          onLine,
        }) as unknown as Navigator,
    );
  };

  it('should set offline flag when offline in PWA mode', () => {
    mockMatchMedia({ '(display-mode: standalone)': true });
    mockNavigator(false);

    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).toHaveBeenCalledWith(
      OFFLINE_VISIT_FLAG,
      'true',
    );
  });

  it('should not set flag when online in PWA mode', () => {
    mockMatchMedia({ '(display-mode: standalone)': true });
    mockNavigator(true);

    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should not set flag when offline in browser mode', () => {
    mockMatchMedia({ '(display-mode: browser)': true });
    mockNavigator(false);

    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should not set flag when online in browser mode', () => {
    mockMatchMedia({ '(display-mode: browser)': true });
    mockNavigator(true);

    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should handle localStorage errors gracefully', () => {
    mockMatchMedia({ '(display-mode: standalone)': true });
    mockNavigator(false);
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
    mockMatchMedia({});
    mockNavigator(false);
    jest
      .spyOn(window, 'navigator', 'get')
      .mockImplementation(
        () => ({ standalone: true, onLine: false }) as unknown as Navigator,
      );

    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).toHaveBeenCalledWith(
      OFFLINE_VISIT_FLAG,
      'true',
    );
  });
});
