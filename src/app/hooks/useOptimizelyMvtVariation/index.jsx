import { useContext } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
import activateExperiment from './activateExperiment';

const useOptimizelyMvtVariation = id => {
  const { optimizely } = useContext(OptimizelyContext);
  const { mvtExperiments } = useContext(RequestContext);

  if (!mvtExperiments || mvtExperiments.length === 0 || id === null) {
    return null;
  }

  const experiment = mvtExperiments.find(
    ({ experimentName }) => experimentName === id,
  );

  if (!experiment) return null;

  const isEnabled = experiment.enabled;
  const variation = isEnabled && experiment.variation;

  if (variation) activateExperiment(optimizely, id, variation);

  return variation;
};

export default useOptimizelyMvtVariation;
