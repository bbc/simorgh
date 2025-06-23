import onClient from '#lib/utilities/onClient';
import { ReactSDKClient } from '@optimizely/react-sdk';

type Props = {
  optimizely: ReactSDKClient;
  experimentName: string;
  variation: string;
};

const activateExperiment = async ({
  optimizely,
  experimentName,
  variation,
}: Props) => {
  if (onClient() && optimizely) {
    const success = await optimizely?.onReady();
    if (success) {
      optimizely.setForcedVariation(experimentName, variation);
      optimizely.activate(experimentName);
    }
  }
};

export default activateExperiment;
