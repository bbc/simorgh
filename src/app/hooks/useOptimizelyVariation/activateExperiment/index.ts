import onClient from '#lib/utilities/onClient';
import { ReactSDKClient } from '@optimizely/react-sdk';
import { RefObject } from 'react';

type Props = {
  optimizely: ReactSDKClient;
  experimentName: string;
  experimentVariation: string;
  activatedExperiments: RefObject<string[]>;
};

const activateExperiment = async ({
  optimizely,
  experimentName,
  experimentVariation,
  activatedExperiments,
}: Props) => {
  if (onClient() && optimizely) {
    const { success } = await optimizely.onReady();
    if (success && !activatedExperiments.current.includes(experimentName)) {
      activatedExperiments.current.push(experimentName);
      optimizely.setForcedVariation(experimentName, experimentVariation);
      optimizely.activate(experimentName);
    }
  }
};

export default activateExperiment;
