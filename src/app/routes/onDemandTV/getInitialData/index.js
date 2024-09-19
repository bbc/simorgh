import pathOr from 'ramda/src/pathOr';
import pathWithLogging, {
  LOG_LEVELS,
} from '#lib/utilities/logging/pathWithLogging';
import { TV_MISSING_FIELD } from '#lib/logger.const';
import getEpisodeAvailability, {
  getUrl,
} from '#lib/utilities/episodeAvailability';
import processRecentEpisodes from '#app/routes/utils/processRecentEpisodes';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import getPlaceholderImageUrl from '../../utils/getPlaceholderImageUrl';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

const DEFAULT_TOGGLE_VALUE = { enabled: false, value: 4 };

const getRecentEpisodesToggle = pathOr(DEFAULT_TOGGLE_VALUE, [
  'recentVideoEpisodes',
]);

export default async ({ path: pathname, pageType, toggles }) => {
  try {
    const onDemandTvDataPath = overrideRendererOnTest(pathname);
    const { json, status } = await fetchPageData({
      path: onDemandTvDataPath,
      pageType,
    });
    const recentEpisodesToggle = getRecentEpisodesToggle(toggles);
    const { enabled: showRecentEpisodes, value: recentEpisodesLimit } =
      recentEpisodesToggle;

    const get = pathWithLogging(getUrl(json), TV_MISSING_FIELD, json);

    const episodeId = get(['content', 'blocks', 0, 'id'], LOG_LEVELS.ERROR);
    const recentEpisodes = showRecentEpisodes
      ? processRecentEpisodes(json, {
          exclude: episodeId,
          recentEpisodesLimit,
        })
      : [];

    const mediaBlocks = get(['content', 'blocks']).map(block => {
      return {
        type: 'tv',
        model: { ...block },
      };
    });

    const pageIdentifier = get([
      'metadata',
      'analyticsLabels',
      'pageIdentifier',
    ]);

    return {
      status,
      pageData: {
        metadata: {
          type: 'On Demand TV',
          atiAnalytics: {
            pageIdentifier,
          },
        },
        language: get(['metadata', 'language']),
        brandTitle: get(['metadata', 'title']),
        id: get(['metadata', 'id'], LOG_LEVELS.ERROR),
        headline: get(['promo', 'headlines', 'headline'], LOG_LEVELS.WARN),
        shortSynopsis: get(['promo', 'media', 'synopses', 'short']),
        mediumSynopsis: get(['promo', 'media', 'synopses', 'medium']),
        contentType: get(['metadata', 'analyticsLabels', 'contentType']),
        pageTitle: get(['metadata', 'analyticsLabels', 'pageTitle']),
        pageIdentifier,
        releaseDateTimeStamp: get(
          ['metadata', 'releaseDateTimeStamp'],
          LOG_LEVELS.WARN,
        ),
        durationISO8601: get([
          'promo',
          'media',
          'versions',
          0,
          'durationISO8601',
        ]),
        thumbnailImageUrl: getPlaceholderImageUrl(
          get(['promo', 'media', 'imageUrl']),
        ),
        promoBrandTitle: get(['promo', 'brand', 'title']),
        masterBrand: get(['metadata', 'createdBy'], LOG_LEVELS.ERROR),
        episodeId,
        imageUrl: get(['content', 'blocks', 0, 'imageUrl']),
        episodeAvailability: getEpisodeAvailability(json),
        episodeTitle: get(['content', 'blocks', 0, 'episodeTitle']),
        recentEpisodes,
        mediaBlocks,
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
