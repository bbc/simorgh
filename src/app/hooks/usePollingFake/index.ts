import { useCallback, useEffect, useState } from 'react';

const FAKE_POLLING_INTERVAL = 5000;

let updateCount = 0;

const usePollingFake = () => {
  const [forceUpdate, setForceUpdate] = useState(false);

  const updateFinished = useCallback(() => {
    setForceUpdate(false);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      console.log('Timer started');
      setForceUpdate(true);
      updateCount += 1;
      console.log(`Timer triggered: ${updateCount} time(s)`);
    }, FAKE_POLLING_INTERVAL);

    return () => clearTimeout(timerId);
  }, []);

  return {
    forceUpdate,
    updateFinished,
  };
};

export default usePollingFake;
