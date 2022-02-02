import { useState, useContext, useEffect } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';

const OptimizelyPageViewTracking = () => {
  const { isAmp } = useContext(RequestContext);
  const { optimizely } = useContext(OptimizelyContext);
  const [pageViewSent, setPageViewSent] = useState(false);

  const sendPageViewEvent = !isAmp && !pageViewSent;

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
