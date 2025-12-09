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
    // EXPERIMENT: Continue Reading button for articles & EXPERIMENT: Article Read Time 2
    pageType: ARTICLE_PAGE,
    activeExperiments: [
      'newswb_ws_read_more_b',
      'newswb_ws_article_read_time_2',
      'newswb_ws_tod_article',
      'newswb_ws_pwa_promo_prompt',
    ],
  },
  {
    // EXPERIMENT: Homepage Time of Day Adaptive Curations & EXPERIMENT: PWA Promotional Banner
    pageType: HOME_PAGE,
    activeExperiments: ['newswb_ws_tod_homepage', 'newswb_ws_pwa_promo_prompt'],
  },
];

export default experimentsForPageMetrics;
