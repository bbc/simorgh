import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
// import useOptimizelyScrollDepth from '#hooks/useOptimizelyScrollDepth';
import OptimizelyArticleCompleteTracking from './OptimizelyArticleCompleteTracking';
import OptimizelyPageViewTracking from './OptimizelyPageViewTracking';
import OptimizelyScrollDepth from './OptimizelyScrollDepth';

const OptimizelyPageMetrics = ({
  trackPageView = false,
  trackPageDepth = false,
  trackPageComplete = false,
}) => {
  const { isAmp } = useContext(RequestContext);
  if (isAmp) return null;
  return (
    <>
      {trackPageComplete && <OptimizelyArticleCompleteTracking />}
      {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
      {/* {trackPageDepth && useOptimizelyScrollDepth()} */}
      {trackPageDepth && <OptimizelyScrollDepth />}
      {trackPageView && <OptimizelyPageViewTracking />}
    </>
  );
};

export default OptimizelyPageMetrics;
