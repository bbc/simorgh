import onClient from '#lib/utilities/onClient';
import { ReactSDKClient } from '@optimizely/react-sdk';

type Props = {
  optimizely: ReactSDKClient;
  experimentName: string;
  experimentVariation: string;
};

const activateExperiment = async ({
  optimizely,
  experimentName,
  experimentVariation,
}: Props) => {
  if (onClient() && optimizely) {
    const success = await optimizely?.onReady();
    if (success) {
      optimizely.setForcedVariation(experimentName, experimentVariation);
      optimizely.activate(experimentName);
    }
  }
};

export default activateExperiment;
