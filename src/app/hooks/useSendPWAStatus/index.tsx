import { use, useEffect } from 'react';
import useToggle from '#app/hooks/useToggle';
import isLocal from '#app/lib/utilities/isLocal';
import { ServiceContext } from '#contexts/ServiceContext';

const useSendPWAStatus = (isPWA: boolean) => {
  const { service } = use(ServiceContext);
  const { enabled, value } = useToggle('offlineArticle');

  const isOfflineArticleEnabled =
    enabled &&
    (isLocal() ? value?.toString().split('|').includes(service) : true);

  useEffect(() => {
    // Service workers not available - exit.
    if (typeof window === 'undefined' || !navigator.serviceWorker) {
      return;
    }

    const sendPWAStatus = () => {
      const sw = navigator.serviceWorker;

      if (sw.controller && sw.controller.state === 'activated') {
        sw.controller.postMessage({
          type: 'PWA_STATUS',
          isPWA,
          offlineArticle: {
            isEnabled: isOfflineArticleEnabled,
            service,
          },
        });
      }
    };

    const sw = navigator.serviceWorker;

    if (sw.ready && typeof sw.ready.then === 'function') {
      sw.ready.then(sendPWAStatus);
    }

    // Listen for SW taking control
    sw.addEventListener('controllerchange', sendPWAStatus);

    // eslint-disable-next-line consistent-return
    return () => {
      sw.removeEventListener('controllerchange', sendPWAStatus);
    };
  }, [isPWA, isOfflineArticleEnabled, service]);
};

export default useSendPWAStatus;
