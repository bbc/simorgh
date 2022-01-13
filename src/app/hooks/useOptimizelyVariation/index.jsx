import { useState, useEffect } from 'react';
import { useDecision } from '@optimizely/react-sdk';

const useOptimizelyVariation = (experimentId, overrideAttributes = {}) => {
  let decisionResult;

  console.log('test');

  try {
    decisionResult = useDecision(
      experimentId,
      {
        autoUpdate: true,
      },
      { overrideAttributes },
    );
  } catch {
    decisionResult = ['control', true, false];
  }

  const [decision, isClientReady, didTimeout] = decisionResult;

  const [variation, setVariation] = useState(null);

  useEffect(() => {
    if (isClientReady && !didTimeout) {
      setVariation(decision.variationKey);
    }
  }, [isClientReady, decision.variationKey, didTimeout]);

  return variation;
};

export default useOptimizelyVariation;
