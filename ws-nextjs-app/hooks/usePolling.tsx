import { useCallback, useEffect, useRef, useState } from 'react';

const usePolling = () => {
  const [forceUpdate, setForceUpdate] = useState(false);
  // const [pageHasEnded, setPageHasEnded] = useState(false);
  const pollTimerRef = useRef<NodeJS.Timeout>();
  const POLLING_INTERVAL = 15000; // if updated, please update the POLLING_INTERVAL const here too: packages/website/containers/stream/configs/time-periods.js

  const startPolling = useCallback(() => {
    pollTimerRef.current = setInterval(() => {
      setForceUpdate(true);
    }, POLLING_INTERVAL);
  }, []);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      // Had to add this because of react strict mode
      pollTimerRef.current = undefined;
    }
  }, [pollTimerRef]);

  // const stopPollingIfPageEnded = useCallback(
  //   (endTimeDate: string) => {
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
    const shouldAddPollTimer = !pollTimerRef.current;

    if (shouldAddPollTimer) {
      startPolling();
    }

    return stopPolling;
  }, [pollTimerRef, startPolling, stopPolling]);

  return {
    forceUpdate,
    updateFinished,
    stopPolling,
    // stopPollingIfPageEnded,
    // stopPollingIfFeatureToggleOff,
  };
};

export default usePolling;
