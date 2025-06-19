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
  const [isInExperiment, setisInExperiment] = useState(false);

  const optimizelyExperimentsEnabled =
    experiments && experiments.length > 0 && !isAmp && !isInExperiment;

  useEffect(() => {
    if (optimizelyExperimentsEnabled) {
      optimizely?.onReady().then(() => {
        const decisions = optimizely.decideAll();
        const isUserInAnyExperiments = experiments.some(
          experimentName => !(decisions[experimentName].variationKey === 'off'),
        );

        if (isUserInAnyExperiments) {
          setisInExperiment(true);
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

  if (!isInExperiment) {
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
