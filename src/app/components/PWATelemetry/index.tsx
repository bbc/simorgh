import { use, useEffect } from 'react';
import useIsPWA from '#app/hooks/useIsPWA';
import useNetworkStatus from '#app/hooks/useNetworkStatus';
import usePianoAdapter from '#app/analytics/usePianoAdapter';
import { RequestContext } from '#app/contexts/RequestContext';
import { initInstallCapture, getInstallSignals } from '#app/pwa/installManager';

// dev logging helper (no logs in production)
const isDev =
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production';
const log = (...args: unknown[]) => {
  if (!isDev) return;
  // eslint-disable-next-line no-console
  console.log('[PWA][telemetry]', ...args);
};

const PWATelemetry = () => {
  const isPWA = useIsPWA();
  const { isOnline, source } = useNetworkStatus();
  const { service, pageType } = use(RequestContext);
  const { track, flush } = usePianoAdapter();

  useEffect(() => {
    log('mount');
    // attempt to flush queued events on mount
    flush().catch(() => {
      // swallow errors in PoC
    });

    const displayMode = isPWA ? 'standalone' : 'browser';
    // eslint-disable-next-line camelcase
    track(isOnline ? 'device_online' : 'device_offline', {
      service,
      // eslint-disable-next-line camelcase
      page_type: pageType,
      // eslint-disable-next-line camelcase
      is_online: isOnline,
      // eslint-disable-next-line camelcase
      network_source: source,
      // eslint-disable-next-line camelcase
      display_mode: displayMode,
    });
    log('initial_status', { isOnline, displayMode, source });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Heuristic install detection for iOS (no beforeinstallprompt/appinstalled)
  useEffect(() => {
    const isStandalone =
      (typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(display-mode: standalone)').matches) ||
      (typeof navigator !== 'undefined' &&
        (navigator as unknown as { standalone?: boolean }).standalone === true);

    if (!isStandalone) {
      log('ios_heuristic', { isStandalone });
      return;
    }

    const trackedFlag = localStorage.getItem('pwa_installed_tracked');
    const alreadyTracked = trackedFlag === '1';
    if (alreadyTracked) return;

    const displayMode = 'standalone';
    // eslint-disable-next-line camelcase
    track('pwa_already_installed', {
      service,
      // eslint-disable-next-line camelcase
      page_type: pageType,
      // eslint-disable-next-line camelcase
      detection_level: 'heuristic',
      // eslint-disable-next-line camelcase
      install_state: 'installed',
      // eslint-disable-next-line camelcase
      display_mode: displayMode,
    });
    localStorage.setItem('pwa_installed_tracked', '1');
    log('ios_installed_heuristic_tracked');
  }, [isPWA, pageType, service, track]);

  useEffect(() => {
    const displayMode = isPWA ? 'standalone' : 'browser';
    // eslint-disable-next-line camelcase
    track(isOnline ? 'device_online' : 'device_offline', {
      service,
      // eslint-disable-next-line camelcase
      page_type: pageType,
      // eslint-disable-next-line camelcase
      is_online: isOnline,
      // eslint-disable-next-line camelcase
      network_source: source,
      // eslint-disable-next-line camelcase
      display_mode: displayMode,
    });
    log('status_change', { isOnline, displayMode, source });
    if (isOnline) {
      flush().catch(() => {
        // swallow errors in PoC
      });
      log('flush_trigger', { reason: 'online' });
    }
  }, [isOnline, source, isPWA, pageType, service, track, flush]);

  useEffect(() => {
    // initialize beforeinstallprompt capture
    initInstallCapture(() => {
      const displayMode = isPWA ? 'standalone' : 'browser';
      // eslint-disable-next-line camelcase
      track('pwa_install_available', {
        service,
        // eslint-disable-next-line camelcase
        page_type: pageType,
        // eslint-disable-next-line camelcase
        detection_level: 'app',
        // eslint-disable-next-line camelcase
        install_state: 'supported',
        // eslint-disable-next-line camelcase
        display_mode: displayMode,
      });
      log('install_available');
    });

    const onAppInstalled = () => {
      const displayMode = isPWA ? 'standalone' : 'browser';
      // eslint-disable-next-line camelcase
      track('pwa_already_installed', {
        service,
        // eslint-disable-next-line camelcase
        page_type: pageType,
        // eslint-disable-next-line camelcase
        detection_level: 'app',
        // eslint-disable-next-line camelcase
        install_state: 'installed',
        // eslint-disable-next-line camelcase
        display_mode: displayMode,
      });
      log('appinstalled_event');
    };
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, [isPWA, pageType, service, track]);

  // Expose a global for demo to trigger install manually in PoC
  useEffect(() => {
    (window as unknown as Record<string, unknown>).pwaInstall = (async () => {
      return async () => {
        const signals = getInstallSignals();
        if (!signals.canInstall || !signals.prompt)
          return 'unavailable' as const;
        // eslint-disable-next-line camelcase
        track('pwa_install_triggered', {
          service,
          // eslint-disable-next-line camelcase
          page_type: pageType,
          source: 'cta_button',
        });
        log('install_triggered');
        const outcome = await signals.prompt();
        // eslint-disable-next-line camelcase
        track('pwa_install_result', {
          service,
          // eslint-disable-next-line camelcase
          page_type: pageType,
          outcome,
        });
        log('install_result', { outcome });
        return outcome;
      };
    })();
  }, [pageType, service, track]);

  // Flush when app becomes visible again (useful on mobile returning from background)
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        flush().catch(() => {
          // swallow errors in PoC
        });
        log('flush_trigger', { reason: 'visible' });
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [flush]);

  return null;
};

export default PWATelemetry;
