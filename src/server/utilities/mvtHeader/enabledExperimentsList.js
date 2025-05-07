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
    name: 'header_a_a_test',
    services: ['hindi', 'urdu'],
    pageTypes: ['article'],
  },
];

export default enabledExperimentList;
