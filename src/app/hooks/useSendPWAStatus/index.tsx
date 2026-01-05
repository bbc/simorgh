import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useSendPWAStatus = (
  isPWA: boolean,
  service?: string,
  swVersion?: string,
) => {
  const router = useRouter();

  useEffect(() => {
    // Service workers not available - exit .
    if (typeof window === 'undefined' || !navigator.serviceWorker) {
      return;
    }

    const sendPWAStatus = () => {
      const sw = navigator.serviceWorker;

      if (sw.controller && sw.controller.state === 'activated') {
        sw.controller.postMessage({
          type: 'PWA_STATUS',
          isPWA,
        });

        //  Prefetch offline route ONCE
        Object.keys(localStorage)
          .filter(k => k.startsWith(`offline-prefetched-`))
          .forEach(k => localStorage.removeItem(k));

        const key = `offline-prefetched-${service}-${swVersion}`;
        if (localStorage.getItem(key)) return;

        router.prefetch(`/${service}/offline`);
        localStorage.setItem(key, 'true');

        console.log('[PWA] Offline route prefetched');
      }
    };

    const sw = navigator.serviceWorker;

    // if SW ready
    if (sw.ready && typeof sw.ready.then === 'function') {
      sw.ready.then(sendPWAStatus);
    }

    // Listen for SW taking control
    sw.addEventListener('controllerchange', sendPWAStatus);

    // eslint-disable-next-line consistent-return
    return () => {
      sw.removeEventListener('controllerchange', sendPWAStatus);
    };
  }, [isPWA, service, router, swVersion]);
};

export default useSendPWAStatus;
