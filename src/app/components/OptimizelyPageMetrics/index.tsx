import React, { useState, useContext, useEffect } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
import PageCompleteTracking from './PageCompleteTracking';
import ScrollDepthTracking from './ScrollDepthTracking';
import PageViewTracking from './PageViewTracking';
import { experimentsForPageMetrics as experiments } from './experimentsForPageMetrics';

const OptimizelyPageMetrics = ({
  trackPageView = false,
  trackPageDepth = false,
  trackPageComplete = false,
}) => {
  const { optimizely } = useContext(OptimizelyContext);
  const { isAmp } = useContext(RequestContext);
  const [haveRunDecideAll, setHaveRunDecideAll] = useState(false);

  const optimizelyExperimentsEnabled =
    experiments && experiments.length > 0 && !isAmp && !haveRunDecideAll;

  useEffect(() => {
    if (optimizelyExperimentsEnabled) {
      optimizely?.onReady().then(() => {
        const decisions = optimizely.decideAll();
        const isUserInAnyExperiments = experiments.some(
          experimentName => !(decisions[experimentName].variationKey === 'off'),
        );

        if (isUserInAnyExperiments) {
          setHaveRunDecideAll(true);
        }
      });
    }
  }, [
    optimizelyExperimentsEnabled,
    optimizely,
    trackPageComplete,
    trackPageDepth,
    trackPageView,
  ]);

  if (!haveRunDecideAll) {
    return null;
  }
  return (
    <>
      {trackPageComplete && <PageCompleteTracking />}
      {trackPageDepth && <ScrollDepthTracking />}
      {trackPageView && <PageViewTracking />}
    </>
  );
};

export default OptimizelyPageMetrics;
