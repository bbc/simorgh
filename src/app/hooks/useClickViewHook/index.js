import useClickTracker from '../useClickTracker';
import useViewTracker from '../useViewTracker';

const useClickViewHook = trackingData => {
  const clickRef = useClickTracker(trackingData);
  const viewRef = useViewTracker(trackingData);

  return {
    clickRef,
    viewRef,
  };
};

export default useClickViewHook;
