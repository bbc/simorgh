import { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { useActivatedExperiments } from '#app/lib/optimizelyDecisionStore';
import PageCompleteTracking from './PageCompleteTracking';
import ScrollDepthTracking from './ScrollDepthTracking';
import experimentsForPageMetrics from './experimentsForPageMetrics';

type Props = {
  trackPageDepth?: boolean;
  trackPageComplete?: boolean;
};

const OptimizelyPageMetrics = ({
  trackPageDepth = false,
  trackPageComplete = false,
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
      experimentsForPageType?.some(name => activatedExperiments.has(name)),
    );

  if (!isInExperiment) {
    return null;
  }

  return (
    <>
      {trackPageComplete && <PageCompleteTracking />}
      {trackPageDepth && <ScrollDepthTracking />}
    </>
  );
};

export default OptimizelyPageMetrics;
