import onClient from '#lib/utilities/onClient';

const activateExperiment = async (optimizely, experimentName, variation) => {
  if (onClient()) {
    await optimizely.onReady().then(({ success }) => {
      if (success) {
        optimizely.setForcedVariation(experimentName, variation);
        optimizely.activate(experimentName);
      }
    });
  }
};

export default activateExperiment;
