const getStatsDestination = ({ isUK = true, env = 'test', service }) => {
  let destination = '';

  if (service === 'news') {
    destination = isUK !== false ? 'PS_NEWS' : 'GNL_NEWS';
  } else if (service === 'cymrufyw' || service === 'naidheachdan') {
    destination = isUK !== false ? 'PS_NEWS_LANGUAGES' : 'GNL_NEWS_LANGUAGES';
  } else if (service === 'japanese') {
    destination = 'GNL_NEWS_LANGUAGES';
  } else {
    destination = 'WS_NEWS_LANGUAGES';
  }
  return env === 'live' ? destination : `${destination}_TEST`;
};

export default getStatsDestination;
