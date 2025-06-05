/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { useDecision } from '@optimizely/react-sdk';

// TODO - changed for development
const isClientSide = true;

// ALTHOUGH THIS FUNCTION BREAKS REACT RULES BY USING CONDITIONAL HOOKS,
// WE CAN SAFELY DO SO SINCE isClientSide IS A CONSTANT AND THEREFORE GUARANTEES THAT
// EACH HOOK WILL BE CALLED IN THE EXACT SAME ORDER UPON INITAL RENDER.
const useOptimizelyVariation = (
  flagKey,
  overrideAttributes = {},
  useClientSide = isClientSide,
) => {
  if (useClientSide) {
    const [decision, isClientReady, didTimeout] = useDecision(
      flagKey,
      {
        autoUpdate: true,
      },
      { overrideAttributes },
    );

    // TODO - changed for development
    const [variation, setVariation] = useState(undefined);

    useEffect(() => {
      if (isClientReady && !didTimeout) {
        setVariation(decision.variationKey);
      }
    }, [isClientReady, decision.variationKey, didTimeout]);

    return variation;
  }
  // TODO - changed for development
  return '';
};

export default useOptimizelyVariation;
