import { ServerSideExperiment } from '#app/models/types/global';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { useContext } from 'react';
import activateExperiment from '../activateExperiment';

type Props = {
  serverSideExperiments: ServerSideExperiment[];
  flagKey: string;
};

export default ({ serverSideExperiments, flagKey }: Props) => {
  const { optimizely } = useContext(OptimizelyContext);

  if (!optimizely) return null;

  const experiment = serverSideExperiments.find(
    ({ experimentName }) => experimentName === flagKey,
  );

  if (!experiment) return null;

  const isEnabled = experiment.enabled;
  const variation = isEnabled && experiment.variation;

  if (!variation || variation === 'false') return null;

  if (variation) activateExperiment(optimizely, flagKey, variation);

  return variation;
};
