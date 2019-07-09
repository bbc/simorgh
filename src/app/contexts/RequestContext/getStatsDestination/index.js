const getStatsDestination = ({ isUK = true, env = 'test', service }) => {
  let destination = '';

  if (service === 'news') {
    destination = isUK !== false ? 'NEWS_PS' : 'NEWS_GNL';
  } else {
    destination = 'WS_NEWS_LANGUAGES';
  }

  return env === 'live' || env === 'stage'
    ? destination
    : `${destination}_TEST`;
};

export default getStatsDestination;
