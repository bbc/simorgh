import path from 'ramda/src/path';

// REBECCA
const formatEpisodeData = episode => {
  // full url or service/programme/id?
  return {
    id: episode.media.id,
    url: 'https://www.bbc.com/blahasda',
    brandTitle: episode.brand.title,
    episodeTitle: episode.media.episodeTitle,
    date: episode.releaseDateTimestamp,
    time: episode.media.versions[0].availableFrom,
    duration: episode.media.versions[0].durationISO8601,
  };
};

const processRecentEpisodes = json => {
  // temp limit for 4 episodes
  const episodes = path(['relatedContent', 'groups', 0, 'promos'], json).slice(
    0,
    4,
  );
  return episodes.map(episode => formatEpisodeData(episode));
};

// RYAN
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

// TODO: ramda, limit, exclude, validate, logging
const extractRecentEpisodes = (
  pageData,
  { limit = 5, exclude = null } = {},
) => {
  const recentEpisodes = pageData.relatedContent.groups[0].promos;

  if (!recentEpisodes) return [];

  const service = pageData.metadata.analyticsLabels.pageIdentifier.split(
    '.',
  )[0];

  return recentEpisodes.map(episode => formatEpisode(episode, service));
};

export default processRecentEpisodes;
// export default extractRecentEpisodes;
