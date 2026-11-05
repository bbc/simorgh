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
];

export default enabledExperimentList;
