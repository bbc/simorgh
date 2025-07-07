import { useEffect, useRef } from 'react';
import useNonInteractiveTracker from '../useNonInteractiveTracker';

/**
 * Hook to automatically track PWA installation events.
 */
const usePWAInstallTracker = () => {
  const { trackEvent } = useNonInteractiveTracker({
    componentName: 'usePWAInstallTracker',
    eventName: 'PWAInstall',
  });

  const hasTracked = useRef(false);

  useEffect(() => {
    function handleAppInstalled(e: Event) {
      if (!hasTracked.current) {
        trackEvent({
          customData: {
            randomId: crypto.randomUUID(),
            eventType: e.type,
          },
        });
        hasTracked.current = true;
      }
    }

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [trackEvent]);
};

export default usePWAInstallTracker;
