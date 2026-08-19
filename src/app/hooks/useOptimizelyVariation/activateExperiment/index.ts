import onClient from '#lib/utilities/onClient';
import { ReactSDKClient } from '@optimizely/react-sdk';

// Module-level (not per hook-instance) so concurrent renders of the same
// experiment can't each independently pass the guard and call activate().
const activatedExperiments = new Set<string>();

const resetActivatedExperiments = () => activatedExperiments.clear();

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
    const { success } = await optimizely.onReady();
    if (success && !activatedExperiments.has(experimentName)) {
      activatedExperiments.add(experimentName);
      optimizely.setForcedVariation(experimentName, experimentVariation);
      optimizely.activate(experimentName);
    }
  }
};

export default activateExperiment;
export { resetActivatedExperiments };
