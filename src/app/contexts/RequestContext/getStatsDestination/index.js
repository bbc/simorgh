const getStatsDestination = ({ isUK = true, env = 'test', service }) => {
  let destination = '';
  switch (service) {
    case 'news':
      destination = isUK !== false ? 'NEWS_PS' : 'NEWS_GNL';
      break;
    case 'cymrufyw':
    case 'naidheachdan':
      destination = isUK !== false ? 'NEWS_LANGUAGES_PS' : 'NEWS_LANGUAGES_GNL';
      break;
    case 'japanese':
      destination = 'NEWS_LANGUAGES_GNL';
      break;
    default:
      destination = 'WS_NEWS_LANGUAGES';
  }
  return env === 'live' ? destination : `${destination}_TEST`;
};

export default getStatsDestination;
