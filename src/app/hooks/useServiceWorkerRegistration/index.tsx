import { useEffect } from 'react';

export function useServiceWorkerRegistration(service?: string) {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      service
    ) {
      navigator.serviceWorker.register(`/${service}/sw.js`).catch(err => {
        // eslint-disable-next-line no-console
        console.error('Service worker registration failed:', err);
      });
    }
  }, [service]);
}
