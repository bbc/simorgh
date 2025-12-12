import { useEffect } from 'react';

const useSendPWAStatus = (isPWA: boolean) => {
  useEffect(() => {
    // Service workers not available - exit .
    // eslint-disable-next-line consistent-return
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const sendPWAStatus = () => {
      const sw = navigator.serviceWorker;

      if (sw.controller && sw.controller.state === 'activated') {
        sw.controller.postMessage({
          type: 'PWA_STATUS',
          isPWA,
        });
      }
    };

    const sw = navigator.serviceWorker;

    // if SW ready
    if (sw.ready && typeof sw.ready.then === 'function') {
      sw.ready.then(sendPWAStatus);
    }

    // Listen for SW taking control
    sw.addEventListener('controllerchange', sendPWAStatus);

    return () => {
      sw.removeEventListener('controllerchange', sendPWAStatus);
    };
  }, [isPWA]);
};

export default useSendPWAStatus;
