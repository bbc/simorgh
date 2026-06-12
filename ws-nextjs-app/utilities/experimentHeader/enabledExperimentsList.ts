import { PageTypes, Services } from '#app/models/types/global';

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
  {
    name: 'newswb_ws_pwa_promo_prompt',
    services: ['portuguese'],
    pageTypes: ['home', 'article'],
  },
];

export default enabledExperimentList;
