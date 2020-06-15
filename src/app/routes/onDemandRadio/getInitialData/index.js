import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import getPlaceholderImageUrlUtil from '../../utils/getPlaceholderImageUrl';
import { logExpiredEpisode, getUri } from './logInitialData';
import pathWithLogging, {
  LOG_LEVELS,
} from '../../../lib/utilities/logging/pathWithLogging';
import { RADIO_MISSING_FIELD } from '#lib/logger.const';

const getEpisodeAvailability = ({ availableFrom, availableUntil }) => {
  const timeNow = Date.now();
  if (!availableUntil || timeNow < availableFrom) {
    return false;
  }
  return true;
};

const getEpisodeAvailableFrom = path([
  'content',
  'blocks',
  '0',
  'versions',
  '0',
  'availableFrom',
]);
const getEpisodeAvailableUntil = path([
  'content',
  'blocks',
  '0',
  'versions',
  '0',
  'availableUntil',
]);

export default async ({ path: pathname }) => {
  const onDemandRadioDataPath = overrideRendererOnTest(pathname);
  const { json, ...rest } = await fetchPageData(onDemandRadioDataPath);

  const pageType = { metadata: { type: 'On Demand Radio' } };

  const availableFrom = getEpisodeAvailableFrom(json);
  const availableUntil = getEpisodeAvailableUntil(json);
  const episodeIsAvailable = getEpisodeAvailability({
    availableFrom,
    availableUntil,
  });

  if (!episodeIsAvailable) {
    logExpiredEpisode(json);
  }

  const get = fieldPath => path(fieldPath, json);
  const getWithLogging = pathWithLogging(
    getUri(json),
    RADIO_MISSING_FIELD,
    json,
  );

  return {
    ...rest,
    ...(json && {
      pageData: {
        language: getWithLogging(['metadata', 'language']),
        brandTitle: getWithLogging(['metadata', 'title']),
        episodeTitle: get(['content', 'blocks', 0, 'title']),
        headline: getWithLogging(['promo', 'headlines', 'headline'], {
          logLevel: LOG_LEVELS.WARN,
        }),
        shortSynopsis: get(['promo', 'media', 'synopses', 'short']),
        id: get(['metadata', 'id']),
        summary: getWithLogging(['content', 'blocks', 0, 'synopses', 'short']),
        contentType: getWithLogging([
          'metadata',
          'analyticsLabels',
          'contentType',
        ]),
        episodeId: getWithLogging(['content', 'blocks', 0, 'id'], {
          logLevel: LOG_LEVELS.ERROR,
        }),
        masterBrand: getWithLogging(['metadata', 'createdBy'], {
          logLevel: LOG_LEVELS.ERROR,
        }),
        releaseDateTimeStamp: getWithLogging(
          ['metadata', 'releaseDateTimeStamp'],
          { logLevel: LOG_LEVELS.WARN },
        ),
        pageTitle: get(['metadata', 'analyticsLabels', 'pageTitle']),
        pageIdentifier: get(['metadata', 'analyticsLabels', 'pageIdentifier']),
        imageUrl: getWithLogging(['content', 'blocks', 0, 'imageUrl']),
        promoBrandTitle: get(['promo', 'brand', 'title']),
        durationISO8601: getWithLogging([
          'promo',
          'media',
          'versions',
          0,
          'durationISO8601',
        ]),
        thumbnailImageUrl: getPlaceholderImageUrlUtil(
          getWithLogging(['promo', 'media', 'imageUrl']),
        ),
        episodeIsAvailable,
        ...pageType,
      },
    }),
  };
};
