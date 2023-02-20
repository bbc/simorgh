import { useState, useEffect } from 'react';
import { useDecision } from '@optimizely/react-sdk';

const isClientSide = false;

const useTrueFunction = () => {
  return true;
};

const useClientSideOptimizelyVariation = (
  experimentId,
  overrideAttributes = {},
) => {
  const [decision, isClientReady, didTimeout] = useDecision(
    experimentId,
    {
      autoUpdate: true,
    },
    { overrideAttributes },
  );

  const [variation, setVariation] = useState(null);

  useEffect(() => {
    if (isClientReady && !didTimeout) {
      setVariation(decision.variationKey);
    }
  }, [isClientReady, decision.variationKey, didTimeout]);

  return variation;
};

const useOptimizelyVariation = (useClientSide = isClientSide) =>
  useClientSide ? useClientSideOptimizelyVariation : useTrueFunction;

export default useOptimizelyVariation;
