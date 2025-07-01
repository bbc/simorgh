/* 
This is a maintained list of serverside experiments that we are running.
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
      'afrique',
      'arabic',
      'gujarati',
      'hausa',
      'hindi',
      'igbo',
      'marathi',
      'pidgin',
      'punjabi',
      'somali',
      'swahili',
      'tamil',
      'telugu',
      'urdu',
    ],
    pageTypes: ['article'],
  },
];

export default enabledExperimentList;
