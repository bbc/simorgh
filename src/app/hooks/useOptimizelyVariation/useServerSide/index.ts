import { OptimizelyContext } from '@optimizely/react-sdk';
import { useContext, useEffect, useRef } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import useOptimizelyActivationEvent from '#hooks/useOptimizelyActivationEvent';
import activateExperiment from '../activateExperiment';

export default (experimentName: string) => {
  const { optimizely } = useContext(OptimizelyContext);
  const { serverSideExperiments } = useContext(RequestContext);
  const activatedExperiments = useRef<string[]>([]);
  const sendActivationEvent = useOptimizelyActivationEvent();

  const experiment = serverSideExperiments?.find(
    ({ experimentName: serverSideExperiment }) =>
      serverSideExperiment === experimentName,
  );
  const { enabled, variation } = experiment || {};
  const activeVariation =
    enabled && variation && variation !== 'false' ? variation : null;

  useEffect(() => {
    if (optimizely && activeVariation) {
      activateExperiment({
        optimizely,
        experimentName,
        experimentVariation: activeVariation,
        activatedExperiments,
        onExperimentActivated: sendActivationEvent,
      });
    }
  }, [optimizely, experimentName, activeVariation, sendActivationEvent]);

  return optimizely ? activeVariation : null;
};
