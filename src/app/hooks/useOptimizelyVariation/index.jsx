/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { useDecision } from '@optimizely/react-sdk';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';

// ALTHOUGH THIS FUNCTION BREAKS REACT RULES BY USING CONDITIONAL HOOKS,
// WE CAN SAFELY DO SO SINCE isClientSide IS A CONSTANT AND THEREFORE GUARANTEES THAT
// EACH HOOK WILL BE CALLED IN THE EXACT SAME ORDER UPON INITAL RENDER.
const useOptimizelyVariation = (
  experimentId,
  overrideAttributes = {},
  useClientSide = OPTIMIZELY_CONFIG.clientSide,
) => {
  if (useClientSide) {
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
  }

  return true;
};

export default useOptimizelyVariation;
