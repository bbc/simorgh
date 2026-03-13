import { OptimizelyContext } from '@optimizely/react-sdk';
import { useContext } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import activateExperiment from '../activateExperiment';

export default (experimentName: string) => {
  const { optimizely } = useContext(OptimizelyContext);
  const { serverSideExperiments } = useContext(RequestContext);

  if (!optimizely) return null;

  if (!serverSideExperiments || serverSideExperiments.length === 0) {
    return null;
  }

  const experiment = serverSideExperiments.find(
    ({ experimentName: serverSideExperiment }) =>
      serverSideExperiment === experimentName,
  );

  if (!experiment) return null;
  const { enabled, variation } = experiment;

  if (!enabled || !variation || variation === 'false') return null;

  if (variation)
    activateExperiment({
      optimizely,
      experimentName,
      experimentVariation: variation,
    });

  return variation;
};
