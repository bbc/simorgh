import pathOr from 'ramda/src/pathOr';
import is from 'ramda/src/is';

const validateEpisode = episode => {
  const checks = [
    episode,
    is(String, episode.id),
    episode.id.contains(':'),
    episode.brand,
    is(String, episode.brand.title),
    episode.media,
    is(String, episode.media.id),
    is(Array, episode.media.versions),
    episode.media.versions[0],
    is(String, episode.media.versions[0].durationISO8601),
  ];

  // TODO: log if invalid

  return checks.every(Boolean);
};

const formatEpisode = (episode, service) => {
  // TODO Ramda
  return {
    id: episode.media.id,
    url: `/${service}/${episode.id.split(':').pop().replace('/', '/tv/')}`,
    brandTitle: episode.brand.title,
    date: '4 Avril 2020', // TODO
    duration: episode.media.versions[0].durationISO8601,
    image: `//${episode.media.imageUrl.replace('$recipe', '768x432')}`,
    altText: episode.brand.title,
  };
};

const excludeEpisode = idToExclude => episode => episode.id !== idToExclude;

// TODO: ramda, limit, exclude, validate, logging
const processRecentEpisodes = (
  pageData,
  { limit = 5, exclude = null } = {},
) => {
  const recentEpisodes = pathOr(
    [],
    ['relatedContent', 'groups', 0, 'promos'],
    pageData,
  )
    .filter(validateEpisode)
    .filter(excludeEpisode(exclude));

  if (!recentEpisodes) return [];

  const serviceName = pathOr(
    '',
    ['metadata', 'analyticsLabels', 'pageIdentifier', 'promos'],
    pageData,
  ).split('.')[0];

  if (!serviceName) return [];

  return recentEpisodes
    .map(episode => formatEpisode(episode, serviceName))
    .slice(0, limit);
};

export default processRecentEpisodes;
