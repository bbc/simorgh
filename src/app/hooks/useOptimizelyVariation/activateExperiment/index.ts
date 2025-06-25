import onClient from '#lib/utilities/onClient';
import { ReactSDKClient } from '@optimizely/react-sdk';

type Props = {
  optimizely: ReactSDKClient;
  experimentVariant: string;
  variation: string;
};

const activateExperiment = async ({
  optimizely,
  experimentVariant,
  variation,
}: Props) => {
  if (onClient() && optimizely) {
    const success = await optimizely?.onReady();
    if (success) {
      optimizely.setForcedVariation(experimentVariant, variation);
      optimizely.activate(experimentVariant);
    }
  }
};

export default activateExperiment;
