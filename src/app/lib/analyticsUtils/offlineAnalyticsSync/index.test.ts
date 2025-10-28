import { replayOfflineAnalytics, setupOnlineListener } from './index';

describe('offlineAnalyticsSync', () => {
  const mockPostMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        controller: {
          postMessage: mockPostMessage,
        },
      },
      writable: true,
      configurable: true,
    });
  });

  describe('replayOfflineAnalytics', () => {
    it('should post message to service worker when available', async () => {
      await replayOfflineAnalytics();

      expect(mockPostMessage).toHaveBeenCalledWith({
        type: 'REPLAY_ANALYTICS',
      });
    });

    it('should not throw error when service worker is not available', async () => {
      Object.defineProperty(navigator, 'serviceWorker', {
        value: undefined,
        writable: true,
        configurable: true,
      });

      await expect(replayOfflineAnalytics()).resolves.not.toThrow();
    });

    it('should not throw error when controller is not available', async () => {
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {},
        writable: true,
        configurable: true,
      });

      await expect(replayOfflineAnalytics()).resolves.not.toThrow();
    });
  });

  describe('setupOnlineListener', () => {
    let addEventListenerSpy: jest.SpyInstance;

    beforeEach(() => {
      addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    });

    afterEach(() => {
      addEventListenerSpy.mockRestore();
    });

    it('should add online event listener', () => {
      setupOnlineListener();

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'online',
        expect.any(Function),
      );
    });

    it('should trigger replayOfflineAnalytics when online', () => {
      setupOnlineListener();

      const onlineHandler = addEventListenerSpy.mock.calls[0][1];
      onlineHandler();

      expect(mockPostMessage).toHaveBeenCalledWith({
        type: 'REPLAY_ANALYTICS',
      });
    });
  });
});
