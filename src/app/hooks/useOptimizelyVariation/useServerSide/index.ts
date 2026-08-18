import { OptimizelyContext } from '@optimizely/react-sdk';
import { useContext, useEffect, useRef } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import activateExperiment from '../activateExperiment';

export default (experimentName: string) => {
  const { optimizely } = useContext(OptimizelyContext);
  const { serverSideExperiments } = useContext(RequestContext);
  const activatedExperiments = useRef<string[]>([]);

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
      });
    }
  }, [optimizely, experimentName, activeVariation]);

  return optimizely ? activeVariation : null;
};
