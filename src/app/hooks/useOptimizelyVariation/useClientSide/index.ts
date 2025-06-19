/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { useDecision } from '@optimizely/react-sdk';

type Props = {
  flagKey: string;
  overrideAttributes?: Record<string, string>;
};

export default ({ flagKey, overrideAttributes = {} }: Props) => {
  const [decision, isClientReady, didTimeout] = useDecision(
    flagKey,
    {
      autoUpdate: true,
    },
    { overrideAttributes },
  );

  const [variation, setVariation] = useState<string | null>(null);

  useEffect(() => {
    if (isClientReady && !didTimeout) {
      setVariation(decision.variationKey);
    }
  }, [isClientReady, decision.variationKey, didTimeout]);

  return variation;
};
