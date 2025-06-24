import { useState, useContext, useEffect } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import useOptimizelyVariation, { ExperimentState } from '#app/hooks/useOptimizelyVariation';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';

const PageViewTracking = () => {
  const { optimizely } = useContext(OptimizelyContext);
  const [pageViewSent, setPageViewSent] = useState(false);

  const experimentVariation = useOptimizelyVariation({
    experimentName: OPTIMIZELY_CONFIG.flagKey,
    experimentType: ExperimentState.CLIENT_SIDE,
  });

  const sendPageViewEvent = experimentVariation && !pageViewSent;

  useEffect(() => {
    if (sendPageViewEvent) {
      optimizely?.onReady().then(() => {
        optimizely.track('page-views');
        setPageViewSent(true);
      });
    }
  }, [sendPageViewEvent, optimizely]);

  return null;
};

export default PageViewTracking;
