import { OptimizelyContext } from '@optimizely/react-sdk';
import { useContext, useEffect } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import trackPageEvents from '#app/legacy/containers/PageHandlers/withOptimizelyProvider/trackPageEvents';
import activateExperiment from '../activateExperiment';

export default (experimentName: string) => {
  const { optimizely } = useContext(OptimizelyContext);
  const { serverSideExperiments } = useContext(RequestContext);

  const experiment = serverSideExperiments?.find(
    ({ experimentName: serverSideExperiment }) =>
      serverSideExperiment === experimentName,
  );
  const { enabled, variation } = experiment || {};
  const activeVariation =
    enabled && variation && variation !== 'false' ? variation : null;

  useEffect(() => {
    if (optimizely && activeVariation) {
      const activateAndTrack = async () => {
        try {
          const wasActivated = await activateExperiment({
            optimizely,
            experimentName,
            experimentVariation: activeVariation,
          });

          if (wasActivated) {
            trackPageEvents(optimizely);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(
            `Optimizely server-side activation failed for ${experimentName}`,
            error,
          );
        }
      };

      activateAndTrack();
    }
  }, [optimizely, experimentName, activeVariation]);

  return optimizely ? activeVariation : null;
};
