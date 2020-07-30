import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import getPlaceholderImageUrl from '../../utils/getPlaceholderImageUrl';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import pathWithLogging, {
  LOG_LEVELS,
} from '#lib/utilities/logging/pathWithLogging';
import { TV_MISSING_FIELD } from '#lib/logger.const';
import getEpisodeAvailability, {
  getUrl,
} from '#lib/utilities/episodeAvailability';

export default async ({ path: pathname, pageType }) => {
  try {
    const onDemandTvDataPath = overrideRendererOnTest(pathname);
    const { json, status } = await fetchPageData({
      path: onDemandTvDataPath,
      pageType,
    });

    const get = pathWithLogging(getUrl(json), TV_MISSING_FIELD, json);

    return {
      status,
      pageData: {
        metadata: { type: 'On Demand TV' },
        language: get(['metadata', 'language']),
        brandTitle: get(['metadata', 'title']),
        id: get(['metadata', 'id'], LOG_LEVELS.ERROR),
        headline: get(['promo', 'headlines', 'headline'], LOG_LEVELS.WARN),
        shortSynopsis: get(['promo', 'media', 'synopses', 'short']),
        contentType: get(['metadata', 'analyticsLabels', 'contentType']),
        pageTitle: get(['metadata', 'analyticsLabels', 'pageTitle']),
        pageIdentifier: get(['metadata', 'analyticsLabels', 'pageIdentifier']),
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
        episodeId: get(['content', 'blocks', 0, 'id'], LOG_LEVELS.ERROR),
        imageUrl: get(['content', 'blocks', 0, 'imageUrl']),
        episodeAvailability: getEpisodeAvailability(json),
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
