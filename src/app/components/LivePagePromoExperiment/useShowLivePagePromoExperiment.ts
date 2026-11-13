import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import isLive from '#lib/utilities/isLive';
import {
  LIVE_PAGE_PROMO_EXPERIMENT_NAME,
  LIVE_PAGE_PROMO_EXPERIMENT_VARIANT,
} from './config';

const useShowLivePagePromoExperiment = () => {
  const experimentVariant = useOptimizelyVariation({
    experimentName: LIVE_PAGE_PROMO_EXPERIMENT_NAME,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  return !isLive() && experimentVariant === LIVE_PAGE_PROMO_EXPERIMENT_VARIANT;
};

export default useShowLivePagePromoExperiment;
