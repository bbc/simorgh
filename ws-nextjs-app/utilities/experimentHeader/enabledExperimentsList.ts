import { PageTypes, Services } from '#app/models/types/global';
import { MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { HOMEPAGE_ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME } from '#app/components/Account/AccountPromotionalBannerHomePageExperiment';
import { MAP_REGISTRATION_EXPERIMENT_NAME } from '#app/components/Account/MapRegistrationBannerExperiment/config';
import { LIVE_PAGE_PROMO_EXPERIMENT_NAME } from '#app/components/LivePagePromoExperiment/config';

/* 
This is a maintained list of serverside experiments that we are running.
Add enabled experiments objects inside this array in this format:
{
  name: '',
  services: [],
  pageTypes: [],
}
*/

type ServerSideExperimentConfig = {
  name: string;
  services: Services[];
  pageTypes: PageTypes[];
};

const enabledExperimentList: ServerSideExperimentConfig[] = [
  // experiment: test_server_side_experiment_visits_aa
  {
    name: 'test_server_side_experiment_visits_aa',
    services: [
      'afaanoromoo',
      'afrique',
      'amharic',
      'igbo',
      'somali',
      'swahili',
      'tigrinya',
      'yoruba',
    ],
    pageTypes: ['home'],
  },
  {
    name: HOMEPAGE_ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME,
    services: ['hindi'],
    pageTypes: ['home'],
  },
  {
    name: MAP_REGISTRATION_EXPERIMENT_NAME,
    services: ['hindi'],
    pageTypes: [MEDIA_ARTICLE_PAGE],
  },
  {
    name: LIVE_PAGE_PROMO_EXPERIMENT_NAME,
    services: ['mundo'],
    pageTypes: ['article'],
  },
];

export default enabledExperimentList;
