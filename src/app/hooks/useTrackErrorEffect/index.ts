import { useEffect } from 'react';
import useErrorTracking, {
  type TrackErrorParams,
} from '#app/hooks/useErrorTracking';

const useTrackErrorEffect = ({
  error,
  feature,
  action,
}: TrackErrorParams): void => {
  const trackError = useErrorTracking();

  useEffect(() => {
    if (error) {
      trackError({ error, feature, action });
    }
  }, [error, feature, action, trackError]);
};

export default useTrackErrorEffect;
