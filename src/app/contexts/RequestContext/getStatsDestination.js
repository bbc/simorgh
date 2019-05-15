const getStatsDestination = ({ isUK = true, env = 'test', service }) => {
  let destination = '';

  const destinationIDs = {
    NEWS_PS: 598285,
    NEWS_GNL: 598287,
    NEWS_PS_TEST: 598286,
    NEWS_GNL_TEST: 598288,
    WS_NEWS_LANGUAGES: 598342,
    WS_NEWS_LANGUAGES_TEST: 598343,
  };

  if (service === 'news') {
    destination = isUK !== false ? 'NEWS_PS' : 'NEWS_GNL';
  } else {
    destination = 'WS_NEWS_LANGUAGES';
  }

  const key = env === 'live' ? destination : `${destination}_TEST`;

  return destinationIDs[key] || destinationIDs.NEWS_PS;
};

export default getStatsDestination;
