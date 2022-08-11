import { useContext } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { ExperimentContext } from '#contexts/ExperimentContext';
import { RequestContext } from '#contexts/RequestContext';
import onClient from '#lib/utilities/onClient';

const activateExperiment = async (optimizely, experimentName, variation) => {
  if (onClient()) {
    const success = await optimizely.onReady();
    if (success) {
      optimizely.setForcedVariation(experimentName, variation);
      optimizely.activate(experimentName);
    }
  }
};

const useOptimizelyMvtVariation = experimentId => {
  const { optimizely } = useContext(OptimizelyContext);
  const { dataMvt, setDataMvt } = useContext(ExperimentContext);
  const { mvtExperiments } = useContext(RequestContext);
  const variation = mvtExperiments[experimentId];

  if (!variation) return null;

  if (onClient()) {
    activateExperiment(optimizely, experimentId, variation);
  }

  if (!dataMvt.includes(`mvt-${experimentId}`)) {
    if (!dataMvt) {
      setDataMvt(`mvt-${experimentId}`);
    } else {
      setDataMvt(`${dataMvt}, mvt-${experimentId}`);
    }
  }

  return variation;
};

export default useOptimizelyMvtVariation;
