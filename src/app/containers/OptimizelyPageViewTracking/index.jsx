import { useState, useContext, useEffect } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
import useOptimizelyScrollDepth from '#hooks/useOptimizelyScrollDepth';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';

const IMPROVED_PROMO_EXPERIMENT_ID = 'improved_promos';

const OptimizelyPageViewTracking = () => {
  const { isAmp } = useContext(RequestContext);
  const { optimizely } = useContext(OptimizelyContext);
  const [pageViewSent, setPageViewSent] = useState(false);

  const promoVariation = useOptimizelyVariation(IMPROVED_PROMO_EXPERIMENT_ID);
  const hasVariationKey = promoVariation !== null;

  const sendPageViewEvent = hasVariationKey && !isAmp && !pageViewSent;

  useOptimizelyScrollDepth();

  useEffect(() => {
    if (sendPageViewEvent) {
      optimizely.onReady().then(() => {
        optimizely.track('page_views');
        setPageViewSent(true);
      });
    }
  }, [sendPageViewEvent, optimizely]);

  return null;
};

export default OptimizelyPageViewTracking;
