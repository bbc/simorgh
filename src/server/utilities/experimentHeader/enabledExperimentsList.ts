/* 
This is a maintained list of serverside experiments that we are running.
Add enabled experiments objects inside this array in this format:
{
  name: '',
  services: [],
  pageTypes: [],
}
*/
// TODO - add
const enabledExperimentList = [
  {
    name: 'newswb_ws_mundo_pwa_prompt',
    services: ['mundo'],
    // TBC - if article is needed?
    pageTypes: ['home', 'article'],
  },
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
