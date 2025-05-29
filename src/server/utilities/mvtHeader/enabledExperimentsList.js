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
    name: 'newswb_ws_topbarojs_read_more',
    services: [
      'hindi',
      'marathi',
      'gujarati',
      'punjabi',
      'tamil',
      'telegu',
      'urdu',
      'hausa',
      'pidgin',
      'swahili',
      'somali',
      'afrique',
      'igbo',
      'arabic',
    ],
    pageTypes: ['article'],
  },
];

export default enabledExperimentList;
