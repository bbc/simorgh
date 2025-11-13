import { useEffect, useRef } from 'react';
import useCustomEventTracker from '../useCustomEventTracker';

/**
 * A hook to track PWA installation events using Reverb Analytics
 */
const usePWAInstallTracker = () => {
  const { trackEvent } = useCustomEventTracker({ eventName: 'pwa-installed' });

  const trackRef = useRef(false);

  useEffect(() => {
    const handleAppInstalled = () => {
      if (!trackRef.current) {
        trackEvent('');
        trackRef.current = true;
      }
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [trackEvent]);
};

export default usePWAInstallTracker;
