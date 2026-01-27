import { PageTypes } from '#app/models/types/global';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
// Any running serverside and client side experiments which collect Optimizely Page Metrics; page view, page complete, scroll depth
// Includes PageType so that different experiments can be run on different pageTypes

type ExperimentsForPageTypeMetrics = {
  pageType: PageTypes;
  activeExperiments: string[];
}[];

const experimentsForPageMetrics: ExperimentsForPageTypeMetrics = [
  {
    // EXPERIMENT: OJ Referrer
    pageType: ARTICLE_PAGE,
    activeExperiments: ['newswb_ws_read_more_b', 'newswb_ws_tod_article'],
  },
];

export default experimentsForPageMetrics;
