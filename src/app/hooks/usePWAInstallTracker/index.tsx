import { useEffect, useRef } from 'react';
import useCustomEventTracker from '../useCustomEventTracker';

/**
 * A hook to track PWA installation events using Reverb Analytics
 */
const usePWAInstallTracker = () => {
  const { trackEvent } = useCustomEventTracker({
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
