import { renderHook, waitFor } from '@testing-library/react';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useServiceWorkerRegistration from './index';

describe('useServiceWorkerRegistration', () => {
  const mockRegister = jest.fn();
  const mockGetRegistrations = jest.fn();
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
          getRegistrations: mockGetRegistrations,
        },
      },
      writable: true,
      configurable: true,
    });

    mockRegister.mockResolvedValue({});
    mockGetRegistrations.mockResolvedValue([]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should register service worker with correct path when service is provided', async () => {
    renderHook(() => useServiceWorkerRegistration('mundo'));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('/mundo/sw.js', {
        scope: '/mundo',
      });
    });
  });

  it('should register service worker for different services', async () => {
    const { rerender } = renderHook(
      ({ service }) => useServiceWorkerRegistration(service),
      {
        initialProps: { service: 'news' },
      },
    );

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('/news/sw.js', {
        scope: '/news',
      });
    });

    mockRegister.mockClear();
    rerender({ service: 'sport' });

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('/sport/sw.js', {
        scope: '/sport',
      });
    });
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

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Service worker initialization failed',
        error,
      );
    });
  });

  it('should handle server-side rendering gracefully', () => {
    renderSSRHook(() => useServiceWorkerRegistration('mundo'));

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should register for new service when service prop changes', async () => {
    const { rerender } = renderHook(
      ({ service }) => useServiceWorkerRegistration(service),
      {
        initialProps: { service: 'mundo' },
      },
    );

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledTimes(1);
      expect(mockRegister).toHaveBeenCalledWith('/mundo/sw.js', {
        scope: '/mundo',
      });
    });

    mockRegister.mockClear();
    rerender({ service: 'news' });

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledTimes(1);
      expect(mockRegister).toHaveBeenCalledWith('/news/sw.js', {
        scope: '/news',
      });
    });
  });

  it('should not register again when service prop stays the same', async () => {
    const { rerender } = renderHook(
      ({ service }) => useServiceWorkerRegistration(service),
      {
        initialProps: { service: 'mundo' },
      },
    );

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledTimes(1);
    });

    mockRegister.mockClear();
    rerender({ service: 'mundo' });

    // No waitFor needed for negative assertion
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

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('/mundo/sw.js', {
        scope: '/mundo',
      });
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
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

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Service worker initialization failed',
        error,
      );
    });
  });

  it('should unregister legacy service worker with trailing slash scope', async () => {
    const mockUnregister = jest.fn().mockResolvedValue(true);
    const legacyRegistration = {
      scope: 'https://example.com/mundo/',
      unregister: mockUnregister,
    };

    mockGetRegistrations.mockResolvedValue([legacyRegistration]);

    renderHook(() => useServiceWorkerRegistration('mundo'));

    await waitFor(() => {
      expect(mockGetRegistrations).toHaveBeenCalled();
      expect(mockUnregister).toHaveBeenCalled();
    });
  });

  it('should not unregister service worker when scope does not have trailing slash', async () => {
    const mockUnregister = jest.fn();
    const currentRegistration = {
      scope: 'https://example.com/mundo',
      unregister: mockUnregister,
    };

    mockGetRegistrations.mockResolvedValue([currentRegistration]);

    renderHook(() => useServiceWorkerRegistration('mundo'));

    await waitFor(() => {
      expect(mockGetRegistrations).toHaveBeenCalled();
      expect(mockUnregister).not.toHaveBeenCalled();
    });
  });
});
