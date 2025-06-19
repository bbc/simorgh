import onClient from '#lib/utilities/onClient';

const activateExperiment = async (optimizely, experimentName, variation) => {
  if (onClient() && optimizely) {
    const success = await optimizely?.onReady();
    if (success) {
      optimizely.setForcedVariation(experimentName, variation);
      optimizely.activate(experimentName);
    }
  }
};

export default activateExperiment;
