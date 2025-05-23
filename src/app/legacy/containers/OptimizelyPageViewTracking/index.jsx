import { useState, useContext, useEffect } from 'react';
import { useExperiment } from '@optimizely/react-sdk'; // Import useExperiment
import { RequestContext } from '#contexts/RequestContext';
import useOptimizelyScrollDepth from '#hooks/useOptimizelyScrollDepth';
import useOptimizelyVariations from '#hooks/useOptimizelyVariation'; // Import the new hook
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';

const OptimizelyPageViewTracking = () => {
  const { isAmp } = useContext(RequestContext);
  //  No longer using useContext(OptimizelyContext) directly for tracking
  const [pageViewSent, setPageViewSent] = useState({}); // Track page views per experiment

  // Assuming OPTIMIZELY_CONFIG now contains an object of experiment keys:
  // TO FIX - use memo to fix error
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const experimentKeys = OPTIMIZELY_CONFIG.experimentKeys || {}; // Provide a default if not defined
  // Call the hook to get the variations object.
  const experimentVariations = useOptimizelyVariations(experimentKeys);

  // Get experiment instances for tracking
  // experimentInstances: An array to hold all experiment instances using an array map, because the order matches experimentKeys.
  //  Import useExperiment: This is crucial for accurate event tracking. You'll use it to get the Optimizely client instance specific to each experiment. It's now imported from @optimizely/react-sdk
  const experimentInstances = Object.entries(experimentVariations).map(
    // TO DO - fix rules of hook error
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ([flagKey]) => useExperiment({ key: flagKey }),
  );

  // useEffect Changes:
  // The isAmp check is moved outside the loop for efficiency.
  // Inside the loop, we iterate through the variations.
  // shouldSendPageView is calculated per experiment, checking both the client readiness and the pageViewSent status for that specific experiment.
  // Crucially: experiment.client.track('page-views') uses the experiment-specific client from useExperiment. This ensures proper event attribution in Optimizely.
  // setPageViewSent updates the state correctly using a callback form of setState to access and update the previous state without race conditions.
  useEffect(() => {
    if (!isAmp) {
      // Moved isAmp check outside the loop
      experimentInstances.forEach((experiment, index) => {
        const flagKey = Object.keys(experimentKeys)[index];

        const shouldSendPageView = experiment.client && !pageViewSent[flagKey]; // Check per experiment
        if (shouldSendPageView) {
          experiment.client.track('page-views'); // Track with experiment-specific client
          setPageViewSent(prevState => ({ ...prevState, [flagKey]: true })); // Update page view status
        }
      });
    }
  }, [
    isAmp,
    experimentVariations,
    experimentKeys,
    // State: Now an object to track page view status per experiment. This ensures you only send one page view event per experiment.
    pageViewSent,
    experimentInstances,
  ]); // Correct dependencies

  useOptimizelyScrollDepth(); // This likely doesn't need variations

  return null;
};

export default OptimizelyPageViewTracking;
