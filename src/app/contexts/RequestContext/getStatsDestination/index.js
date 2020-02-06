/* Returns stats destnation for ATI based on origin, service and env
   see table on this issue https://github.com/bbc/simorgh/issues/2995
*/
const getStatsDestination = ({ isUK = true, env = 'test', service }) => {
  let destination = '';
  switch (service) {
    case 'news':
      // checks if "news" service is in the UK or not and set apprioprate destination
      destination = isUK !== false ? 'NEWS_PS' : 'NEWS_GNL';
      break;
    case 'cymrufyw':
    case 'naidheachdan':
      // checks if "cymrufyw" or "naidheachdan" service is in the UK or not and set apprioprate destination
      destination = isUK !== false ? 'NEWS_LANGUAGES_PS' : 'NEWS_LANGUAGES_GNL';
      break;
    case 'japanese':
      destination = 'NEWS_LANGUAGES_GNL';
      break;
    case 'scotland':
      destination = 'PS_HOMEPAGE';
      break;
    case 'archive':
      destination = 'BBC_ARCHIVE_PS';
      break;
    default:
      destination = 'WS_NEWS_LANGUAGES';
  }
  return env === 'live' ? destination : `${destination}_TEST`;
};

export default getStatsDestination;
