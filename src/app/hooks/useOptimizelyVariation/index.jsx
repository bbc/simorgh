import { useState, useEffect } from 'react';
import { useDecision } from '@optimizely/react-sdk';

const useOptimizelyVariation = (experimentId, overrideAttributes = {}) => {
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

export default useOptimizelyVariation;
