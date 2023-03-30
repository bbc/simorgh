/* 
This is a maintained list of experiments that we are running.
Add enabled experiments objects inside this array in this format:
{
  name: '',
  services: [],
  pageTypes: [],
}
*/
const enabledExperimentList = [
  {
    name: 'test_2',
    services: ['pidgin'],
    pageTypes: ['article'],
  },
];

export default enabledExperimentList;
