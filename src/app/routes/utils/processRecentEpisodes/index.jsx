import path from 'ramda/src/path';

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

export default processRecentEpisodes;
