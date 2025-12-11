import { useEffect } from 'react';

const useServiceWorkerRegistration = (service?: string) => {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !('serviceWorker' in navigator) ||
      !service
    ) {
      return;
    }

    const sw = navigator.serviceWorker;

    if (typeof sw.register !== 'function') {
      // eslint-disable-next-line no-console
      console.warn('ServiceWorker API exists but register() is not available.');
      return;
    }

    sw.register(`/${service}/sw.js`).catch(err => {
      // eslint-disable-next-line no-console
      console.error('Service worker registration failed:', err);
    });
  }, [service]);
};

export default useServiceWorkerRegistration;
