import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { PageTypes } from '#app/models/types/global';

// Any running serverside and client side experiments which collect Optimizely Page Metrics; page view, page complete, scroll depth
// Includes PageType so that different experiments can be run on different pageTypes

type ExperimentsForPageTypeMetrics = [
  {
    pageType: PageTypes;
    activeExperiments: string[];
  },
];

const experimentsForPageMetrics: ExperimentsForPageTypeMetrics = [
  {
    pageType: ARTICLE_PAGE,
    activeExperiments: [
      'dummy_experiment',
      'dummy_experiment_1',
      'dummy_experiment_2',
    ],
  },
];

export default experimentsForPageMetrics;
