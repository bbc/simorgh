/**
 * Triggers the service worker to replay queued analytics requests
 * This should be called when the app detects network connectivity is restored
 */
const replayOfflineAnalytics = async (): Promise<void> => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'REPLAY_ANALYTICS',
    });
  }
};

/**
 * Sets up an online event listener to automatically replay analytics
 * when the browser detects connectivity is restored
 */
const setupOnlineListener = (): void => {
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      replayOfflineAnalytics();
    });
  }
};

export { replayOfflineAnalytics, setupOnlineListener };
