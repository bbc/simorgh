import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import OptimizelyPageCompleteTracking from './OptimizelyPageCompleteTracking';
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
      {trackPageComplete && <OptimizelyPageCompleteTracking />}
      {trackPageDepth && <OptimizelyScrollDepth />}
      {trackPageView && <OptimizelyPageViewTracking />}
    </>
  );
};

export default OptimizelyPageMetrics;
