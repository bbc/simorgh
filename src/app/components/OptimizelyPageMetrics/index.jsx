import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import PageCompleteTracking from './PageCompleteTracking';
import ScrollDepthTracking from './ScrollDepthTracking';
import PageViewTracking from './PageViewTracking';

const OptimizelyPageMetrics = ({
  trackPageView = false,
  trackPageDepth = false,
  trackPageComplete = false,
}) => {
  const { isAmp } = useContext(RequestContext);
  if (isAmp) return null;
  return (
    <>
      {trackPageComplete && <PageCompleteTracking />}
      {trackPageDepth && <ScrollDepthTracking />}
      {trackPageView && <PageViewTracking />}
    </>
  );
};

export default OptimizelyPageMetrics;
