import { PageTypes } from '#app/models/types/global';
import { HOMEPAGE_RELATED_TOPIC_EXPERIMENT } from '#app/lib/experiments/homepageRelatedTopicPromos';
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
    ],
  },
  {
    pageType: MEDIA_ARTICLE_PAGE,
    activeExperiments: ['test_page_views_aa_3'],
  },
  {
    pageType: HOME_PAGE,
    activeExperiments: [
      'test_page_views_aa_4',
      // experiment: newswb_ws_homepage_related_topic_promos
      HOMEPAGE_RELATED_TOPIC_EXPERIMENT,
      'newswb_ws_homepage_account_promo_banner_copy',
    ],
  },
];

export default experimentsForPageMetrics;
