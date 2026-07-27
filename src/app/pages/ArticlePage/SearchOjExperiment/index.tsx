import { useEffect } from 'react';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import {
  getSearchOjExperimentProps,
  isSearchOjVariant,
  SEARCH_OJ_EXPERIMENT_NAME,
  SearchOjVariant,
} from './config';

export { getSearchOjExperimentProps };
export type { SearchOjVariant };

type Props = {
  onVariantResolved: (variant: SearchOjVariant | null) => void;
};

const SearchOjExperiment = ({ onVariantResolved }: Props) => {
  const variation = useOptimizelyVariation({
    experimentName: SEARCH_OJ_EXPERIMENT_NAME,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  useEffect(() => {
    if (variation !== null) {
      onVariantResolved(isSearchOjVariant(variation) ? variation : null);
    }
  }, [onVariantResolved, variation]);

  return null;
};

export default SearchOjExperiment;
