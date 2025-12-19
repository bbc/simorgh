import { renderHook } from '@testing-library/react';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useServiceWorkerRegistration from './index';

describe('useServiceWorkerRegistration', () => {
  const mockRegister = jest.fn();
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    Object.defineProperty(global, 'navigator', {
      value: {
        serviceWorker: {
          register: mockRegister,
        },
      },
      writable: true,
      configurable: true,
    });

    mockRegister.mockResolvedValue({});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should register service worker with correct path when service is provided', () => {
    renderHook(() => useServiceWorkerRegistration('mundo'));

    expect(mockRegister).toHaveBeenCalledWith('/mundo/sw.js');
  });

  it('should register service worker for different services', () => {
    const { rerender } = renderHook(
      ({ service }) => useServiceWorkerRegistration(service),
      {
        initialProps: { service: 'news' },
      },
    );

    expect(mockRegister).toHaveBeenCalledWith('/news/sw.js');

    mockRegister.mockClear();
    rerender({ service: 'sport' });

    expect(mockRegister).toHaveBeenCalledWith('/sport/sw.js');
  });

  it('should not register service worker when service is undefined', () => {
    renderHook(() => useServiceWorkerRegistration(undefined));

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should not register service worker when service is empty string', () => {
    renderHook(() => useServiceWorkerRegistration(''));

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should not register when serviceWorker is not supported', () => {
    Object.defineProperty(global, 'navigator', {
      value: {},
      writable: true,
      configurable: true,
    });

    renderHook(() => useServiceWorkerRegistration('mundo'));

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should warn and not register when register is not a function', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        serviceWorker: {
          register: null,
        },
      },
      writable: true,
      configurable: true,
    });

    renderHook(() => useServiceWorkerRegistration('mundo'));

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'ServiceWorker API exists but register() is not available.',
    );
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should handle registration errors gracefully', async () => {
    const error = new Error('Registration failed');
    mockRegister.mockRejectedValue(error);

    renderHook(() => useServiceWorkerRegistration('mundo'));

    await Promise.resolve();
    await Promise.resolve();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Service worker registration failed:',
      error,
    );
  });

  it('should handle server-side rendering gracefully', () => {
    renderSSRHook(() => useServiceWorkerRegistration('mundo'));

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should re-register when service prop changes', () => {
    const { rerender } = renderHook(
      ({ service }) => useServiceWorkerRegistration(service),
      {
        initialProps: { service: 'mundo' },
      },
    );

    expect(mockRegister).toHaveBeenCalledTimes(1);
    expect(mockRegister).toHaveBeenCalledWith('/mundo/sw.js');

    mockRegister.mockClear();
    rerender({ service: 'news' });

    expect(mockRegister).toHaveBeenCalledTimes(1);
    expect(mockRegister).toHaveBeenCalledWith('/news/sw.js');
  });

  it('should not re-register when service prop stays the same', () => {
    const { rerender } = renderHook(
      ({ service }) => useServiceWorkerRegistration(service),
      {
        initialProps: { service: 'mundo' },
      },
    );

    expect(mockRegister).toHaveBeenCalledTimes(1);

    mockRegister.mockClear();
    rerender({ service: 'mundo' });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should handle registration promise that resolves with registration object', async () => {
    const mockRegistration = {
      installing: null,
      waiting: null,
      active: { state: 'activated' },
    };
    mockRegister.mockResolvedValue(mockRegistration);

    renderHook(() => useServiceWorkerRegistration('mundo'));

    expect(mockRegister).toHaveBeenCalledWith('/mundo/sw.js');

    await Promise.resolve();

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should handle synchronous registration error', async () => {
    const error = new Error('Sync registration failed');
    mockRegister.mockImplementation(() => {
      const rejection = Promise.reject(error);
      rejection.catch(() => {
        // Suppress unhandled rejection
      });
      return rejection;
    });

    renderHook(() => useServiceWorkerRegistration('mundo'));

    await Promise.resolve();
    await Promise.resolve();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Service worker registration failed:',
      error,
    );
  });
});
