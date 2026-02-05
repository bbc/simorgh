import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * This interval determines how often the polling function will be triggered. In milliseconds.
 */
const POLLING_INTERVAL = 15000;

/**
 * @type {typeof import('./types.d.ts').usePolling}
 */
export default (hasPolling: boolean) => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [pageHasEnded, setPageHasEnded] = useState(false);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  const startPolling = useCallback(() => {
    if (pollTimerRef.current) {
      return;
    }

    pollTimerRef.current = setInterval(() => {
      setForceUpdate(true);
    }, POLLING_INTERVAL);
  }, []);

  // const stopPollingIfPageEnded = useCallback(
  //   (endTimeDate: string | Date) => {
  //     if (endTimeDate && !pageHasEnded) {
  //       if (new Date() > new Date(endTimeDate)) {
  //         setPageHasEnded(true);
  //         stopPolling();
  //       }
  //     }
  //   },
  //   [pageHasEnded, stopPolling],
  // );

  // const stopPollingIfFeatureToggleOff = useCallback(
  //   (pollingEnabled: boolean) => {
  //     if (pollingEnabled === false && !pageHasEnded) {
  //       setPageHasEnded(true);
  //       stopPolling();
  //     }
  //   },
  //   [pageHasEnded, stopPolling],
  // );

  const updateFinished = useCallback(() => {
    setForceUpdate(false);
  }, []);

  useEffect(() => {
    if (hasPolling && !pageHasEnded) {
      startPolling();
    }

    return () => {
      stopPolling();
    };
  }, [hasPolling, pageHasEnded, startPolling, stopPolling]);

  return {
    forceUpdate,
    updateFinished,
    stopPolling,
    // stopPollingIfPageEnded,
    // stopPollingIfFeatureToggleOff,
    pageHasEnded,
  };
};
