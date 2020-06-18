import pathOr from 'ramda/src/pathOr';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import getPlaceholderImageUrl from '../../utils/getPlaceholderImageUrl';
import pathWithLogging, {
  LOG_LEVELS,
} from '#lib/utilities/logging/pathWithLogging';
import { TV_MISSING_FIELD, TV_EPISODE_EXPIRED } from '#lib/logger.const';

import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

const getEpisodeAvailability = ({ availableFrom, availableUntil, url }) => {
  const timeNow = Date.now();
  if (!availableUntil || timeNow < availableFrom) {
    logger.info(TV_EPISODE_EXPIRED, {
      url,
    });
    return false;
  }
  return true;
};

const getUrl = pageData =>
  pathOr('Unknown', ['metadata', 'analyticsLabels', 'pageIdentifier'], pageData)
    .replace('.page', '')
    .replace(/\./g, '/');

export default async ({ path: pathname }) => {
  const onDemandTvDataPath = overrideRendererOnTest(pathname);
  const { json, ...rest } = await fetchPageData(onDemandTvDataPath);
  if (!json) return rest;

  const url = getUrl(json);

  const get = pathWithLogging(url, TV_MISSING_FIELD, json);

  const availableFrom = get([
    'content',
    'blocks',
    '0',
    'versions',
    '0',
    'availableFrom',
  ]);

  const availableUntil = get([
    'content',
    'blocks',
    '0',
    'versions',
    '0',
    'availableUntil',
  ]);

  return {
    ...rest,
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
      episodeIsAvailable: getEpisodeAvailability({
        availableFrom,
        availableUntil,
        url,
      }),
    },
  };
};
