import React, { useState, useContext, useEffect } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
import { PageTypes } from '#app/models/types/global';
import PageCompleteTracking from './PageCompleteTracking';
import ScrollDepthTracking from './ScrollDepthTracking';
import PageViewTracking from './PageViewTracking';
import { experimentsForPageMetrics as experiments } from './experimentsForPageMetrics';

type Props = {
  trackPageView?: boolean;
  trackPageDepth?: boolean;
  trackPageComplete?: boolean;
  pageType: PageTypes;
};

const OptimizelyPageMetrics = ({
  trackPageView = false,
  trackPageDepth = false,
  trackPageComplete = false,
  pageType,
}: Props) => {
  const { optimizely } = useContext(OptimizelyContext);
  const { isAmp } = useContext(RequestContext);
  const [isInExperiment, setisInExperiment] = useState(false);

  const experimentsForPageType = experiments.find(
    entry => entry.pageType === pageType,
  )?.activeExperiments;

  const optimizelyExperimentsEnabled =
    experimentsForPageType && !isAmp && !isInExperiment;

  useEffect(() => {
    if (optimizelyExperimentsEnabled) {
      optimizely?.onReady().then(() => {
        const decisions = optimizely.decideAll();
        const isUserInAnyExperiments = experimentsForPageType.some(
          experimentName => {
            const decision = decisions[experimentName];
            return decision && decision.variationKey !== 'off';
          },
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
    experimentsForPageType,
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
