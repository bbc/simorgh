import { useSyncExternalStore } from 'react';
import { subscribe, getSnapshot } from '#app/utilities/byteStore';

const useByteTracker = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};

export default useByteTracker;
