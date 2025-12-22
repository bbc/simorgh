import { renderHook } from '@testing-library/react';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useSendPWAStatus from './index';

describe('useSendPWAStatus', () => {
  const mockPostMessage = jest.fn();
  const mockAddEventListener = jest.fn();
  const mockRemoveEventListener = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(global, 'navigator', {
      value: {
        serviceWorker: {
          controller: {
            postMessage: mockPostMessage,
            state: 'activated',
          },
          ready: Promise.resolve(),
          addEventListener: mockAddEventListener,
          removeEventListener: mockRemoveEventListener,
        },
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should send PWA status message when SW is ready and isPWA is true', async () => {
    renderHook(() => useSendPWAStatus(true));

    await Promise.resolve();

    expect(mockPostMessage).toHaveBeenCalledWith({
      type: 'PWA_STATUS',
      isPWA: true,
    });
  });

  it('should send PWA status message when SW is ready and isPWA is false', async () => {
    renderHook(() => useSendPWAStatus(false));

    await Promise.resolve();

    expect(mockPostMessage).toHaveBeenCalledWith({
      type: 'PWA_STATUS',
      isPWA: false,
    });
  });

  it('should add controllerchange event listener', () => {
    renderHook(() => useSendPWAStatus(true));

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'controllerchange',
      expect.any(Function),
    );
  });

  it('should remove controllerchange event listener on unmount', () => {
    const { unmount } = renderHook(() => useSendPWAStatus(true));

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'controllerchange',
      expect.any(Function),
    );
  });

  it('should not send message when serviceWorker is not available', () => {
    Object.defineProperty(global, 'navigator', {
      value: {},
      writable: true,
      configurable: true,
    });

    renderHook(() => useSendPWAStatus(true));

    expect(mockPostMessage).not.toHaveBeenCalled();
  });

  it('should not send message when controller is not activated', async () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        serviceWorker: {
          controller: {
            postMessage: mockPostMessage,
            state: 'installing',
          },
          ready: Promise.resolve(),
          addEventListener: mockAddEventListener,
          removeEventListener: mockRemoveEventListener,
        },
      },
      writable: true,
      configurable: true,
    });

    renderHook(() => useSendPWAStatus(true));

    await Promise.resolve();

    expect(mockPostMessage).not.toHaveBeenCalled();
  });

  it('should not send message when controller is null', async () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        serviceWorker: {
          controller: null,
          ready: Promise.resolve(),
          addEventListener: mockAddEventListener,
          removeEventListener: mockRemoveEventListener,
        },
      },
      writable: true,
      configurable: true,
    });

    renderHook(() => useSendPWAStatus(true));

    await Promise.resolve();

    expect(mockPostMessage).not.toHaveBeenCalled();
  });

  it('should send message on controllerchange event', async () => {
    let controllerChangeHandler: (() => void) | undefined;

    mockAddEventListener.mockImplementation(
      (event: string, handler: () => void) => {
        if (event === 'controllerchange') {
          controllerChangeHandler = handler;
        }
      },
    );

    renderHook(() => useSendPWAStatus(true));

    await Promise.resolve();
    mockPostMessage.mockClear();

    expect(controllerChangeHandler).toBeDefined();
    (controllerChangeHandler as () => void)();

    expect(mockPostMessage).toHaveBeenCalledWith({
      type: 'PWA_STATUS',
      isPWA: true,
    });
  });

  it('should update message when isPWA prop changes', async () => {
    const { rerender } = renderHook(({ isPWA }) => useSendPWAStatus(isPWA), {
      initialProps: { isPWA: false },
    });

    await Promise.resolve();
    expect(mockPostMessage).toHaveBeenCalledWith({
      type: 'PWA_STATUS',
      isPWA: false,
    });

    mockPostMessage.mockClear();
    rerender({ isPWA: true });

    await Promise.resolve();
    expect(mockPostMessage).toHaveBeenCalledWith({
      type: 'PWA_STATUS',
      isPWA: true,
    });
  });

  it('should handle server-side rendering gracefully', () => {
    renderSSRHook(() => useSendPWAStatus(true));

    expect(mockPostMessage).not.toHaveBeenCalled();
  });
});
