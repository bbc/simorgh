/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from 'react';
import { useDecision } from '@optimizely/react-sdk';
import useOptimizelyActivationEvent from '#hooks/useOptimizelyActivationEvent';

type Props = {
  experimentName: string;
  overrideAttributes?: Record<string, string>;
};

export default ({ experimentName, overrideAttributes = {} }: Props) => {
  const [decision, isClientReady, didTimeout] = useDecision(
    experimentName,
    {
      autoUpdate: true,
    },
    { overrideAttributes },
  );

  const [variation, setVariation] = useState<string | null>(null);
  const activatedExperiments = useRef<string[]>([]);
  const sendActivationEvent = useOptimizelyActivationEvent();

  useEffect(() => {
    if (isClientReady && !didTimeout) {
      setVariation(decision.variationKey);

      if (
        decision.variationKey &&
        decision.variationKey !== 'off' &&
        !activatedExperiments.current.includes(experimentName)
      ) {
        activatedExperiments.current.push(experimentName);
        sendActivationEvent(experimentName, decision.variationKey);
      }
    }
  }, [
    isClientReady,
    decision.variationKey,
    didTimeout,
    experimentName,
    sendActivationEvent,
  ]);

  return variation;
};
