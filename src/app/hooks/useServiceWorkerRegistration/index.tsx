import { useEffect } from 'react';

const useServiceWorkerRegistration = (service?: string) => {
  useEffect(() => {
    // Exit if SW API is not available or service is missing
    if (
      typeof window === 'undefined' ||
      !('serviceWorker' in navigator) ||
      !service
    ) {
      return;
    }

    const sw = navigator.serviceWorker;

    // If register is not a function, skip gracefully
    if (typeof sw.register !== 'function') {
      // eslint-disable-next-line no-console
      console.warn('ServiceWorker API exists but register() is not available.');
      return;
    }

    const result = sw.register(`/${service}/sw.js`);

    Promise.resolve(result).catch(err => {
      // eslint-disable-next-line no-console
      console.error('Service worker registration failed:', err);
    });
  }, [service]);
};

export default useServiceWorkerRegistration;
