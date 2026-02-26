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
    // EXPERIMENT: OJ Referrer
    // include tod2 so page-level metrics also fire on article pages for this experiment.
    pageType: ARTICLE_PAGE,
    activeExperiments: ['newswb_ws_oj_by_referrer', 'newswb_ws_tod_article_2'],
  },
  {
    pageType: MEDIA_ARTICLE_PAGE,
    activeExperiments: ['newswb_ws_oj_by_referrer'],
  },
  // TODO add map experiment names when they are confirmed
];

export default experimentsForPageMetrics;
