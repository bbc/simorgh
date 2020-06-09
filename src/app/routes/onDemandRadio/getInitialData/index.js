import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import getPlaceholderImageUrlUtil from '../../utils/getPlaceholderImageUrl';
import { logExpiredEpisode } from './logInitialData';
import pathWithLogging, { LOG_LEVELS } from './pathWithLogging';

const getEpisodeAvailability = ({ availableFrom, availableUntil }) => {
  const timeNow = Date.now();
  if (!availableUntil || timeNow < availableFrom) {
    return false;
  }
  return true;
};

const getBrandTitle = pathWithLogging(['metadata', 'title']);
const getLanguage = pathWithLogging(['metadata', 'language']);
const getEpisodeTitle = path(['content', 'blocks', 0, 'title']);
const getHeadline = pathWithLogging(['promo', 'headlines', 'headline'], {
  logLevel: LOG_LEVELS.WARN,
});
const getShortSynopsis = path(['promo', 'media', 'synopses', 'short']);
const getSummary = pathWithLogging([
  'content',
  'blocks',
  0,
  'synopses',
  'short',
]);
const getEpisodeId = pathWithLogging(['content', 'blocks', 0, 'id'], {
  logLevel: LOG_LEVELS.ERROR,
});
const getImageUrl = pathWithLogging(['content', 'blocks', 0, 'imageUrl']);
const getId = path(['metadata', 'id']);
const getMasterBrand = pathWithLogging(['metadata', 'createdBy'], {
  logLevel: LOG_LEVELS.ERROR,
});
const getContentType = pathWithLogging([
  'metadata',
  'analyticsLabels',
  'contentType',
]);
const getPageTitle = path(['metadata', 'analyticsLabels', 'pageTitle']);
const getPageIdentifier = path([
  'metadata',
  'analyticsLabels',
  'pageIdentifier',
]);
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
const getReleaseDateTimeStamp = pathWithLogging(
  ['metadata', 'releaseDateTimeStamp'],
  { logLevel: LOG_LEVELS.WARN },
);
const getPromoBrandTitle = path(['promo', 'brand', 'title']);
const getDurationISO8601 = pathWithLogging([
  'promo',
  'media',
  'versions',
  0,
  'durationISO8601',
]);
const getThumbnailImageUrl = json =>
  getPlaceholderImageUrlUtil(
    pathWithLogging(['promo', 'media', 'imageUrl'])(json),
  );

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

  return {
    ...rest,
    ...(json && {
      pageData: {
        language: getLanguage(json),
        brandTitle: getBrandTitle(json),
        episodeTitle: getEpisodeTitle(json),
        headline: getHeadline(json),
        shortSynopsis: getShortSynopsis(json),
        id: getId(json),
        summary: getSummary(json),
        contentType: getContentType(json),
        episodeId: getEpisodeId(json),
        masterBrand: getMasterBrand(json),
        releaseDateTimeStamp: getReleaseDateTimeStamp(json),
        pageTitle: getPageTitle(json),
        pageIdentifier: getPageIdentifier(json),
        imageUrl: getImageUrl(json),
        promoBrandTitle: getPromoBrandTitle(json),
        durationISO8601: getDurationISO8601(json),
        thumbnailImageUrl: getThumbnailImageUrl(json),
        episodeIsAvailable,
        ...pageType,
      },
    }),
  };
};
