import { useState, useContext, useEffect } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
import useOptimizelyScrollDepth from '#hooks/useOptimizelyScrollDepth';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';

const OptimizelyPageViewTracking = flagKey => {
  const { isAmp } = useContext(RequestContext);
  const { optimizely } = useContext(OptimizelyContext);
  const [pageViewSent, setPageViewSent] = useState(false);

  const experimentVariation = useOptimizelyVariation(flagKey);
  const hasVariationKey = experimentVariation !== null;

  const sendPageViewEvent = hasVariationKey && !isAmp && !pageViewSent;

  useOptimizelyScrollDepth(flagKey);

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
