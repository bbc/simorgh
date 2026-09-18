import { PageTypes, Services } from '#app/models/types/global';
import { HOMEPAGE_RELATED_TOPIC_EXPERIMENT } from '#app/lib/experiments/homepageRelatedTopicPromos';

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
  // experiment: newswb_ws_homepage_related_topic_promos
  {
    name: HOMEPAGE_RELATED_TOPIC_EXPERIMENT,
    services: ['afrique'],
    pageTypes: ['home'],
  },
  {
    name: 'newswb_ws_article_account_promo_banner',
    services: ['hindi'],
    pageTypes: ['article'],
  },
];

export default enabledExperimentList;
