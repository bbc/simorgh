/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { useDecision } from '@optimizely/react-sdk';

const isClientSide = false;

//  The hook is renamed to reflect that it now handles multiple variations.
// The hook now accepts an array or map of experiment keys. This allows you to specify which experiments to track.

// ALTHOUGH THIS FUNCTION BREAKS REACT RULES BY USING CONDITIONAL HOOKS,
// WE CAN SAFELY DO SO SINCE isClientSide IS A CONSTANT AND THEREFORE GUARANTEES THAT
// EACH HOOK WILL BE CALLED IN THE EXACT SAME ORDER UPON INITAL RENDER.
const useOptimizelyVariations = (experimentKeys, overrideAttributes = {}) => {
  //  The state is changed to an object to store the variation key for each experiment.
  const [variations, setVariations] = useState({});

  // Inside the useEffect, we loop through the experimentKeys and call useDecision for each one. The results are stored in the variations state object. The effect depends on experimentKeys and overrideAttributes now, so it's triggered whenever either of these change.
  useEffect(() => {
    if (isClientSide) {
      const fetchVariations = async () => {
        const newVariations = {};
        // experimentKeys should be an object or array containing the experimentKeys and associated values
        // TO DO - find performant alternative
        // eslint-disable-next-line no-restricted-syntax
        for (const experiment of Object.entries(experimentKeys)) {
          const [flagKey, additionalParams] = experiment;
          const [decision, isClientReady, didTimeout] = useDecision(
            flagKey,
            { autoUpdate: true },
            { overrideAttributes },
          );
          if (isClientReady && !didTimeout) {
            newVariations[flagKey] = {
              variationKey: decision.variationKey,
              ...additionalParams,
            };
          }
        }
        setVariations(newVariations);
      };

      // This function is now asynchronous using async/await. This is critical, because calling useDecision multiple times in a loop without await would not work correctly.
      fetchVariations();
    }
  }, [experimentKeys, overrideAttributes]);

  return variations;
};

export default useOptimizelyVariations;
