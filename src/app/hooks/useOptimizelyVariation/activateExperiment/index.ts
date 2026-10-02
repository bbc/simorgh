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
}: Props): Promise<boolean> => {
  if (!onClient() || !optimizely) return false;

  const { success } = await optimizely.onReady();
  if (!success || activatedExperiments.has(experimentName)) return false;

  activatedExperiments.add(experimentName);
  optimizely.setForcedVariation(experimentName, experimentVariation);
  optimizely.activate(experimentName);

  return true;
};

export default activateExperiment;
export { resetActivatedExperiments };
