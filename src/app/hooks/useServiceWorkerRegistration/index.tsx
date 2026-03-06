import { useEffect } from 'react';
import onClient from '#lib/utilities/onClient';

interface UseServiceWorkerRegistrationParams {
  service?: string;
  swPath?: string;
}

const useServiceWorkerRegistration = ({
  service,
  swPath,
}: UseServiceWorkerRegistrationParams) => {
  useEffect(() => {
    // Exit if SW API is not available, service or swPath is missing
    if (!onClient() || !('serviceWorker' in navigator) || !service || !swPath) {
      return;
    }

    const sw = navigator.serviceWorker;

    // If register is not a function, skip
    if (typeof sw.register !== 'function') {
      // eslint-disable-next-line no-console
      console.warn('ServiceWorker API exists but register() is not available.');
      return;
    }

    const cleanupLegacyRegistrations = async () => {
      if (typeof sw.getRegistrations !== 'function') {
        return;
      }

      const registrations = await sw.getRegistrations();
      const legacy = registrations.find(
        reg => new URL(reg.scope).pathname === `/${service}/`,
      );

      if (legacy) {
        await legacy.unregister();
      }
    };

    const initializeServiceWorker = async () => {
      await cleanupLegacyRegistrations();
      return sw.register(swPath, {
        scope: `/${service}`,
      });
    };

    initializeServiceWorker().catch(err => {
      // eslint-disable-next-line no-console
      console.error('Service worker initialization failed', err);
    });
  }, [service, swPath]);
};

export default useServiceWorkerRegistration;
