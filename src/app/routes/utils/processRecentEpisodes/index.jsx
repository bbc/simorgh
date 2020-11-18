import pathOr from 'ramda/src/pathOr';
import is from 'ramda/src/is';

const validateEpisode = episode => {
  const checks = [
    episode,
    is(String, episode.id),
    episode.id.includes(':'),
    episode.brand,
    is(String, episode.brand.title),
    episode.media,
    is(String, episode.media.id),
    is(String, episode.media.title),
    is(Array, episode.media.versions),
    episode.media.versions[0],
    is(String, episode.media.versions[0].durationISO8601),
    is(Number, episode.media.versions[0].availableFrom),
  ];
  // TODO: log if invalid

  return checks.every(Boolean);
};

// We have different requirements depending on whether or not editorial title their episodes
// However, the data always contains a title - ARES populate a default one if it is not defined
// This function checks if the title appears to be that fallback title, and removes it if so
const formatTitle = title => {
  const defaultTitleRegex = /^\d{2}\/\d{2}\/\d{4} GMT$/; // eg: 13/11/2020 GMT
  if (title.match(defaultTitleRegex)) return '';
  return title;
};

const formatEpisode = (episode, { serviceName, urlFormatter }) => {
  return {
    id: episode.media.id,
    url: urlFormatter(serviceName, episode.id),
    brandTitle: episode.brand.title,
    episodeTitle: formatTitle(episode.media.title),
    timestamp: episode.media.versions[0].availableFrom,
    duration: episode.media.versions[0].durationISO8601,
    image: `//${episode.media.imageUrl.replace('$recipe', '768x432')}`,
    altText: episode.brand.title,
  };
};

const excludeEpisode = idToExclude => episode => episode.id !== idToExclude;

const processRecentEpisodes = (
  pageData,
  {
    limit = 5,
    exclude = null,
    urlFormatter = (service, id) => `/${service}/${id.split(':').pop()}`,
  } = {},
) => {
  const serviceName = pathOr(
    '',
    ['metadata', 'analyticsLabels', 'pageIdentifier'],
    pageData,
  ).split('.')[0];

  if (!serviceName) return [];

  return pathOr([], ['relatedContent', 'groups', 0, 'promos'], pageData)
    .filter(validateEpisode)
    .filter(excludeEpisode(exclude))
    .map(episode => formatEpisode(episode, { serviceName, urlFormatter }))
    .slice(0, limit);
};

export default processRecentEpisodes;
