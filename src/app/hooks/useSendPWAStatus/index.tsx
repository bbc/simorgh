import { useEffect } from 'react';

export function useSendPWAStatus(isPWA: boolean) {
  useEffect(() => {
    const sendPWAStatus = () => {
      if (typeof window !== 'undefined' && navigator.serviceWorker.controller) {
        // eslint-disable-next-line no-console
        console.log('Sending PWA status to SW', isPWA);

        if (
          navigator.serviceWorker.controller &&
          navigator.serviceWorker.controller.state === 'activated'
        ) {
          navigator.serviceWorker.controller.postMessage({
            type: 'PWA_STATUS',
            isPWA,
          });
        }
      }
    };

    // If SW is already active
    navigator.serviceWorker.ready.then(sendPWAStatus);

    // Listen for SW taking control
    navigator.serviceWorker.addEventListener('controllerchange', sendPWAStatus);

    return () => {
      navigator.serviceWorker.removeEventListener(
        'controllerchange',
        sendPWAStatus,
      );
    };
  }, [isPWA]);
}
