import { useState, useContext, useEffect } from 'react';
import {
  OptimizelyContext,
  OptimizelyDecideOption,
} from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
import PageCompleteTracking from './PageCompleteTracking';
import ScrollDepthTracking from './ScrollDepthTracking';
import PageViewTracking from './PageViewTracking';
import VisitTracking from './VisitTracking';
import experimentsForPageMetrics from './experimentsForPageMetrics';

type Props = {
  trackPageView?: boolean;
  trackPageDepth?: boolean;
  trackPageComplete?: boolean;
  trackVisit?: boolean;
};

const OptimizelyPageMetrics = ({
  trackPageView = false,
  trackPageDepth = false,
  trackPageComplete = false,
  trackVisit = false,
}: Props) => {
  const { optimizely } = useContext(OptimizelyContext);
  const { isAmp, pageType } = useContext(RequestContext);
  const [isInExperiment, setisInExperiment] = useState(false);

  const experimentsForPageType = experimentsForPageMetrics.find(
    entry => entry.pageType === pageType,
  )?.activeExperiments;

  const optimizelyExperimentsEnabled =
    experimentsForPageType && !isAmp && !isInExperiment;

  useEffect(() => {
    if (optimizelyExperimentsEnabled) {
      optimizely?.onReady().then(() => {
        const decisions = optimizely.decideAll([
          OptimizelyDecideOption.DISABLE_DECISION_EVENT,
        ]);
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
    trackVisit,
    experimentsForPageType,
  ]);

  if (!isInExperiment) {
    return null;
  }

  // only render the visit-only tracker when page views are disabled so we do not double count visits
  // when page views are tracked, visit events are sent from the page view tracker to preserve ordering
  // for page views per visit, always enable both trackPageView and trackVisit
  const shouldTrackVisitOnly = trackVisit && !trackPageView;

  return (
    <>
      {trackPageComplete && <PageCompleteTracking />}
      {trackPageDepth && <ScrollDepthTracking />}
      {trackPageView && <PageViewTracking trackVisit={trackVisit} />}
      {shouldTrackVisitOnly && <VisitTracking />}
    </>
  );
};

export default OptimizelyPageMetrics;
