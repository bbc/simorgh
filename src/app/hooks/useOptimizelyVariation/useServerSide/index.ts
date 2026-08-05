import { OptimizelyContext } from '@optimizely/react-sdk';
import { useContext, useEffect } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import activateExperiment from '../activateExperiment';

export default (experimentName: string) => {
  const { optimizely } = useContext(OptimizelyContext);
  const { serverSideExperiments } = useContext(RequestContext);

  const experiment = serverSideExperiments?.find(
    ({ experimentName: serverSideExperiment }) =>
      serverSideExperiment === experimentName,
  );

  const { enabled, variation } = experiment ?? {};

  const isActiveVariant = Boolean(
    enabled && variation && variation !== 'false',
  );

  useEffect(() => {
    if (optimizely && isActiveVariant && variation) {
      activateExperiment({
        optimizely,
        experimentName,
        experimentVariation: variation,
      });
    }
  }, [optimizely, isActiveVariant, variation, experimentName]);

  if (!optimizely || !isActiveVariant) return null;

  return variation;
};
