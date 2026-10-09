import { renderHook } from '@testing-library/react';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import { useOfflinePageFlag, OFFLINE_VISIT_FLAG } from './index';

describe('useOfflinePageFlag', () => {
  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
    jest.clearAllMocks();
  });

  it('should set offline flag when rendered', () => {
    renderHook(() => useOfflinePageFlag());

    expect(localStorage.setItem).toHaveBeenCalledWith(
      OFFLINE_VISIT_FLAG,
      'true',
    );
  });

  it('should handle localStorage errors gracefully', () => {
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
});
