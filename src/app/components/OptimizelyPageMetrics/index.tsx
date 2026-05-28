import { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { useActivatedExperiments } from '#app/lib/optimizelyDecisionStore';
import PageCompleteTracking from './PageCompleteTracking';
import ScrollDepthTracking from './ScrollDepthTracking';
import PageViewTracking from './PageViewTracking';
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
  const { isAmp, pageType } = useContext(RequestContext);
  const activatedExperiments = useActivatedExperiments();

  const experimentsForPageType = experimentsForPageMetrics.find(
    entry => entry.pageType === pageType,
  )?.activeExperiments;

  const optimizelyExperimentsEnabled = Boolean(
    experimentsForPageType?.length && !isAmp,
  );

  const isInExperiment =
    optimizelyExperimentsEnabled &&
    Boolean(
      experimentsForPageType?.every(name => activatedExperiments.has(name)),
    );

  if (!isInExperiment) {
    return null;
  }

  return (
    <>
      {trackPageComplete && <PageCompleteTracking />}
      {trackPageDepth && <ScrollDepthTracking />}
      {trackPageView && <PageViewTracking trackVisit={trackVisit} />}
    </>
  );
};

export default OptimizelyPageMetrics;
