import { PageTypes } from '#app/models/types/global';
import {
  ARTICLE_PAGE,
  MEDIA_ARTICLE_PAGE,
  HOME_PAGE,
  TOPIC_PAGE,
} from '#app/routes/utils/pageTypes';
import { HOMEPAGE_ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME } from '#app/components/Account/AccountPromotionalBannerHomePageExperiment';
// Any running serverside and client side experiments which collect Optimizely Page Metrics; page view, page complete, scroll depth
// Includes PageType so that different experiments can be run on different pageTypes

type ExperimentsForPageTypeMetrics = {
  pageType: PageTypes;
  activeExperiments: string[];
}[];

const experimentsForPageMetrics: ExperimentsForPageTypeMetrics = [
  {
    pageType: ARTICLE_PAGE,
    activeExperiments: ['newswb_ws_sticky_navigation'],
  },
  {
    pageType: MEDIA_ARTICLE_PAGE,
    activeExperiments: [],
  },
  {
    pageType: HOME_PAGE,
    activeExperiments: [
      'test_server_side_experiment_visits_aa',
      HOMEPAGE_ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME,
    ],
  },
  {
    pageType: TOPIC_PAGE,
    activeExperiments: ['newswb_ws_hindi_editorial_picks_follow_promo'],
  },
];

export default experimentsForPageMetrics;
