import { useMemo, useSyncExternalStore } from 'react';
import {
  startTimeMachine,
  resetTimeMachine,
} from '../../.storybook/time-machine';
// This affects the global Date object for the storybook application, to ensure consistency in chromaticQA testing.
const getServerSnapshot = () => false;
const createTimeMachineStore = ({ dateString, timestamp }) => {
  let isStarted = false;

  return {
    getSnapshot: () => isStarted,
    subscribe: listener => {
      startTimeMachine({ dateString, timestamp });
      isStarted = true;
      listener();
      return () => {
        isStarted = false;
        resetTimeMachine();
      };
    },
  };
};

const WithTimeMachine = ({ children, dateString, timestamp }) => {
  const store = useMemo(
    () => createTimeMachineStore({ dateString, timestamp }),
    [dateString, timestamp],
  );
  const isStarted = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    getServerSnapshot,
  );

  return isStarted ? children : null;
};

export default WithTimeMachine;
