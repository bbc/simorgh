import { useEffect } from 'react';
import onClient from '#lib/utilities/onClient';

interface UseServiceWorkerRegistrationParams {
  service?: string;
  swPath?: string;
}

const getNormalizedSwPath = ({
  svc,
  path,
}: {
  svc?: string;
  path?: string;
}): string | undefined => {
  if (!svc || !path) return undefined;
  if (path.startsWith(`/${svc}/`)) return path;
  if (path.startsWith('/')) return `/${svc}${path}`;
  return `/${svc}/${path}`;
};

const useServiceWorkerRegistration = ({
  service,
  swPath,
}: UseServiceWorkerRegistrationParams) => {
  const normalizedSwPath = getNormalizedSwPath({ svc: service, path: swPath });
  useEffect(() => {
    // Exit if SW API is not available, service or swPath is missing
    if (
      !onClient() ||
      !('serviceWorker' in navigator) ||
      !service ||
      !normalizedSwPath
    ) {
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
      return sw.register(normalizedSwPath, {
        scope: `/${service}`,
      });
    };

    initializeServiceWorker().catch(err => {
      // eslint-disable-next-line no-console
      console.error('Service worker initialization failed', err);
    });
  }, [service, normalizedSwPath]);
};

export default useServiceWorkerRegistration;
