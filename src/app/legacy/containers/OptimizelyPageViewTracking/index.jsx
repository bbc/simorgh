import { useState, useContext, useEffect } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
import useOptimizelyScrollDepth from '#hooks/useOptimizelyScrollDepth';
import useOptimizelyVariation from '#app/hooks/useOptimizelyVariation';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';

const OptimizelyPageViewTracking = () => {
  const { isAmp } = useContext(RequestContext);
  const { optimizely } = useContext(OptimizelyContext);
  const [pageViewSent, setPageViewSent] = useState(false);

  const experimentVariation = useOptimizelyVariation({flagKey: OPTIMIZELY_CONFIG.flagKey});
  const hasVariationKey = experimentVariation !== null;

  const sendPageViewEvent = hasVariationKey && !isAmp && !pageViewSent;

  useOptimizelyScrollDepth();

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

export default OptimizelyPageViewTracking;
