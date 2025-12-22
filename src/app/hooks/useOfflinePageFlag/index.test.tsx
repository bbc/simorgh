import { renderHook } from '@testing-library/react';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useOfflinePageFlag, { OFFLINE_VISIT_FLAG } from './index';

jest.mock('../useIsPWA');

const mockUseIsPWA = jest.requireMock('../useIsPWA').default as jest.Mock;

describe('useOfflinePageFlag', () => {
  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
    jest.clearAllMocks();
  });

  it('should set offline flag when in PWA mode', () => {
    mockUseIsPWA.mockReturnValue(true);

    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).toHaveBeenCalledWith(
      OFFLINE_VISIT_FLAG,
      'true',
    );
  });

  it('should not set flag when in browser mode', () => {
    mockUseIsPWA.mockReturnValue(false);

    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should handle localStorage errors gracefully', () => {
    mockUseIsPWA.mockReturnValue(true);
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

  it('should set flag with iOS standalone mode', () => {
    mockUseIsPWA.mockReturnValue(true);

    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).toHaveBeenCalledWith(
      OFFLINE_VISIT_FLAG,
      'true',
    );
  });
});
