import { PageTypes } from '#app/models/types/global';
import { ARTICLE_PAGE, HOME_PAGE } from '#app/routes/utils/pageTypes';

// Any running serverside and client side experiments which collect Optimizely Page Metrics; page view, page complete, scroll depth
// Includes PageType so that different experiments can be run on different pageTypes

type ExperimentsForPageTypeMetrics = {
  pageType: PageTypes;
  activeExperiments: string[];
}[];

const experimentsForPageMetrics: ExperimentsForPageTypeMetrics = [
  {
    // EXPERIMENT: Read Time & Continue Reading button for articles
    pageType: ARTICLE_PAGE,
    activeExperiments: ['newswb_ws_article_read_time', 'newswb_ws_read_more_b'],
  },
  {
    // EXPERIMENT: Read Time for homepages
    pageType: HOME_PAGE,
    activeExperiments: ['newswb_ws_homepage_read_time'],
  },
];

export default experimentsForPageMetrics;
