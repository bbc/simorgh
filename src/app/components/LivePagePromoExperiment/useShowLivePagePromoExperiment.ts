import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import { getLivePageBlock } from '.';
import {
  LIVE_PAGE_PROMO_EXPERIMENT_NAME,
  LIVE_PAGE_PROMO_EXPERIMENT_VARIANT,
} from './config';

const useShowLivePagePromoExperiment = (blocks: TopStoryItem[] = []) => {
  const experimentVariant = useOptimizelyVariation({
    experimentName: LIVE_PAGE_PROMO_EXPERIMENT_NAME,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  return (
    experimentVariant === LIVE_PAGE_PROMO_EXPERIMENT_VARIANT &&
    Boolean(getLivePageBlock(blocks))
  );
};

export default useShowLivePagePromoExperiment;
