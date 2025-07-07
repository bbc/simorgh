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
    function handleAppInstalled() {
      console.log('handleAppInstalled called');
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
