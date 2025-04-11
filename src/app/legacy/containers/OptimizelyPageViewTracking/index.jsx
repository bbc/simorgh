import { useState, use, useEffect } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
import useOptimizelyScrollDepth from '#hooks/useOptimizelyScrollDepth';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';

const OptimizelyPageViewTracking = () => {
  const { isAmp } = use(RequestContext);
  const { optimizely } = use(OptimizelyContext);
  const [pageViewSent, setPageViewSent] = useState(false);

  const experimentVariation = useOptimizelyVariation(OPTIMIZELY_CONFIG.flagKey);
  const hasVariationKey = experimentVariation !== null;

  const sendPageViewEvent = hasVariationKey && !isAmp && !pageViewSent;

  useOptimizelyScrollDepth();

  useEffect(() => {
    if (sendPageViewEvent) {
      optimizely?.onReady().then(() => {
        optimizely.track('page_views');
        setPageViewSent(true);
      });
    }
  }, [sendPageViewEvent, optimizely]);

  return null;
};

export default OptimizelyPageViewTracking;
