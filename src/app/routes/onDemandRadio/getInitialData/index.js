import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import getPlaceholderImageUrlUtil from '../../utils/getPlaceholderImageUrl';
import pathWithLogging, {
  LOG_LEVELS,
} from '../../../lib/utilities/logging/pathWithLogging';
import { RADIO_MISSING_FIELD } from '#lib/logger.const';
import getEpisodeAvailability, {
  getUrl,
} from '#lib/utilities/episodeAvailability';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

export default async ({ path: pathname, pageType }) => {
  try {
    const onDemandRadioDataPath = overrideRendererOnTest(pathname);
    const { json, status } = await fetchPageData({
      path: onDemandRadioDataPath,
      pageType,
    });

    const withLogging = pathWithLogging(
      getUrl(json),
      RADIO_MISSING_FIELD,
      json,
    );
    const get = (fieldPath, logLevel) =>
      logLevel ? withLogging(fieldPath, logLevel) : path(fieldPath, json);

    return {
      status,
      pageData: {
        metadata: { type: 'On Demand Radio' },
        language: get(['metadata', 'language'], LOG_LEVELS.INFO),
        brandTitle: get(['metadata', 'title'], LOG_LEVELS.INFO),
        episodeTitle: get(['content', 'blocks', 0, 'title']),
        headline: get(['promo', 'headlines', 'headline'], LOG_LEVELS.WARN),
        shortSynopsis: get(['promo', 'media', 'synopses', 'short']),
        id: get(['metadata', 'id']),
        summary: get(
          ['content', 'blocks', 0, 'synopses', 'short'],
          LOG_LEVELS.INFO,
        ),
        contentType: get(
          ['metadata', 'analyticsLabels', 'contentType'],
          LOG_LEVELS.INFO,
        ),
        episodeId: get(['content', 'blocks', 0, 'id'], LOG_LEVELS.ERROR),
        masterBrand: get(['metadata', 'createdBy'], LOG_LEVELS.ERROR),
        releaseDateTimeStamp: get(
          ['metadata', 'releaseDateTimeStamp'],
          LOG_LEVELS.WARN,
        ),
        pageTitle: get(['metadata', 'analyticsLabels', 'pageTitle']),
        pageIdentifier: get(['metadata', 'analyticsLabels', 'pageIdentifier']),
        imageUrl: get(['content', 'blocks', 0, 'imageUrl'], LOG_LEVELS.INFO),
        promoBrandTitle: get(['promo', 'brand', 'title']),
        durationISO8601: get(
          ['promo', 'media', 'versions', 0, 'durationISO8601'],
          LOG_LEVELS.INFO,
        ),
        thumbnailImageUrl: getPlaceholderImageUrlUtil(
          get(['promo', 'media', 'imageUrl'], LOG_LEVELS.INFO),
        ),
        episodeAvailability: getEpisodeAvailability(json),
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
