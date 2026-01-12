import { useEffect } from 'react';
import onClient from '#lib/utilities/onClient';

const useServiceWorkerRegistration = (service?: string) => {
  useEffect(() => {
    // Exit if SW API is not available or service is missing
    if (!onClient() || !('serviceWorker' in navigator) || !service) {
      return;
    }

    const sw = navigator.serviceWorker;

    // If register is not a function, skip
    if (typeof sw.register !== 'function') {
      // eslint-disable-next-line no-console
      console.warn('ServiceWorker API exists but register() is not available.');
      return;
    }
    const shouldInstallServiceWorker =
      onClient() && 'serviceWorker' in navigator;

    if (shouldInstallServiceWorker) {
      const result = sw.register(`/${service}/sw.js`, {
        scope: `/${service}`,
      });

      Promise.resolve(result).catch(err => {
        // eslint-disable-next-line no-console
        console.error('Service worker registration failed:', err);
      });
    }
  }, [service]);
};

export default useServiceWorkerRegistration;
