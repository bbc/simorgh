import { path } from 'rambda';
import { is } from 'rambda';

const validateEpisode = episode => {
  try {
    const checks = [
      episode,
      is(String, episode.id),
      episode.id.includes(':'),
      episode.brand,
      is(String, episode.brand.title),
      episode.media,
      is(String, episode.media.id),
      episode.media.versions[0],
      is(String, episode.media.versions[0].durationISO8601),
      is(Number, episode.releaseDateTimestamp),
    ];

    return checks.every(Boolean);
  } catch {
    return false;
  }
};

const formatEpisode = episode => ({
  id: episode.media.id,
  brandTitle: episode.brand.title,
  episodeTitle: episode.media.episodeTitle,
  timestamp: episode.releaseDateTimestamp,
  duration: episode.media.versions[0].durationISO8601,
  image: `//${episode.media.imageUrl.replace('$recipe', '768x432')}`,
  altText: episode.brand.title,
});

const excludeEpisode = idToExclude => episode =>
  episode.media.id !== idToExclude;

const processRecentEpisodes = (
  pageData,
  { recentEpisodesLimit = 4, exclude = null } = {},
) =>
  path(['relatedContent', 'groups', 0, 'promos'], pageData)
    .filter(validateEpisode)
    .filter(excludeEpisode(exclude))
    .map(formatEpisode)
    .slice(0, recentEpisodesLimit);

export default processRecentEpisodes;
