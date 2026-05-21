import { PageTypes } from '#app/models/types/global';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
// Any running serverside and client side experiments which collect Optimizely Page Metrics; page view, page complete, scroll depth
// Includes PageType so that different experiments can be run on different pageTypes

type ExperimentsForPageTypeMetrics = {
  pageType: PageTypes;
  activeExperiments: string[];
}[];

const experimentsForPageMetrics: ExperimentsForPageTypeMetrics = [
  {
    // include tod2 so page-level metrics also fire on article pages for this experiment
    pageType: ARTICLE_PAGE,
    activeExperiments: [
      'test_page_views_aa_2',
      'newswb_ws_topic_discovery_module',
    ],
  },
  {
    // include media article pages so page metrics still count after clicking into a video page
    pageType: MEDIA_ARTICLE_PAGE,
    activeExperiments: [],
  },
];

export default experimentsForPageMetrics;
