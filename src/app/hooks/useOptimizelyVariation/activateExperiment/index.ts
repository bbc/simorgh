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

      // The routing layer provides the server-side experiment's rule key as
      // experimentName, while decide() requires the flag key. Our
      // Experimentation handbook requires server-side experiments to use the
      // same value for both keys, so experimentName is passed to both APIs.
      // Supporting distinct keys would require the routing data to expose the
      // flag key as well.
      optimizely.setForcedDecision(
        {
          ruleKey: experimentName,
          flagKey: experimentName,
        },
        { variationKey: experimentVariation },
      );
      optimizely.decide(experimentName);
    }
  }
};

export default activateExperiment;
export { resetActivatedExperiments };
