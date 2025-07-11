import { useEffect, useRef } from 'react';
import useCustomEventTracker from '../useCustomEventTracker';

/**
 * A hook to track PWA installation events using Reverb Analytics
 */
const usePWAInstallTracker = () => {
  const { trackEvent } = useCustomEventTracker({ eventName: 'pwa-installed' });

  const hasTracked = useRef(false);

  useEffect(() => {
    function handleAppInstalled() {
      if (!hasTracked.current) {
        trackEvent();
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
