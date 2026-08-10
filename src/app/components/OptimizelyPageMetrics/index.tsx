import { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { useActivatedExperiments } from '#app/lib/optimizelyDecisionStore';
import PageCompleteTracking from './PageCompleteTracking';
import ScrollDepthTracking from './ScrollDepthTracking';
import SignedInPageViewTracking from './SignedInPageViewTracking';
import experimentsForPageMetrics from './experimentsForPageMetrics';

type Props = {
  trackPageDepth?: boolean;
  trackPageComplete?: boolean;
  trackSignedInViews?: boolean;
};

const OptimizelyPageMetrics = ({
  trackPageDepth = false,
  trackPageComplete = false,
  trackSignedInViews = false,
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

  return (
    <>
      {trackSignedInViews && <SignedInPageViewTracking />}
      {isInExperiment && (
        <>
          {trackPageComplete && <PageCompleteTracking />}
          {trackPageDepth && <ScrollDepthTracking />}
        </>
      )}
    </>
  );
};

export default OptimizelyPageMetrics;
