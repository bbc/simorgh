import { PageTypes } from '#app/models/types/global';
import {
  ARTICLE_PAGE,
  MEDIA_ARTICLE_PAGE,
  HOME_PAGE,
} from '#app/routes/utils/pageTypes';
// Any running serverside and client side experiments which collect Optimizely Page Metrics; page view, page complete, scroll depth
// Includes PageType so that different experiments can be run on different pageTypes

type ExperimentsForPageTypeMetrics = {
  pageType: PageTypes;
  activeExperiments: string[];
}[];

const experimentsForPageMetrics: ExperimentsForPageTypeMetrics = [
  {
    pageType: ARTICLE_PAGE,
    activeExperiments: [
      'test_page_views_aa_3',
      'newswb_ws_article_account_promo_banner',
      // enable page metrics after this experiment is activated
      'newswb_ws_oj_order_referrer_search',
    ],
  },
  {
    pageType: MEDIA_ARTICLE_PAGE,
    activeExperiments: ['test_page_views_aa_3'],
  },
  {
    pageType: HOME_PAGE,
    activeExperiments: ['newswb_ws_homepage_account_promo_banner_copy'],
  },
];

export default experimentsForPageMetrics;
