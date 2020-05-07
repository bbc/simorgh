import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';

const getBrandTitle = path(['metadata', 'title']);
const getLanguage = path(['metadata', 'language']);
const getEpisodeTitle = path(['content', 'blocks', '0', 'title']);
const getHeadline = path(['promo', 'headlines', 'headline']);
const getShortSynopsis = path(['promo', 'media', 'synopses', 'short']);
const getSummary = path(['content', 'blocks', '0', 'synopses', 'short']);
const getEpisodeId = path(['content', 'blocks', '0', 'id']);
const getId = path(['metadata', 'id']);
const getMasterBrand = path(['metadata', 'createdBy']);
const getContentType = path(['metadata', 'analyticsLabels', 'contentType']);
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
const getReleaseDateTimeStamp = path(['metadata', 'releaseDateTimeStamp']);
const getPromoBrandTitle = path(['promo', 'brand', 'title']);
const getDurationISO8601 = path([
  'promo',
  'media',
  'versions',
  0,
  'durationISO8601',
]);
const getImageUrl = path(['promo', 'media', 'imageUrl']);

export default async ({ path: pathname }) => {
  const onDemandRadioDataPath = overrideRendererOnTest(pathname);
  const { json, ...rest } = await fetchPageData(onDemandRadioDataPath);
  const pageType = { metadata: { type: 'On Demand Radio' } };

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
        episodeAvailableFrom: getEpisodeAvailableFrom(json),
        episodeAvailableUntil: getEpisodeAvailableUntil(json),
        releaseDateTimeStamp: getReleaseDateTimeStamp(json),
        pageTitle: getPageTitle(json),
        pageIdentifier: getPageIdentifier(json),
        promoBrandTitle: getPromoBrandTitle(json),
        durationISO8601: getDurationISO8601(json),
        imageUrl: getImageUrl(json),
        ...pageType,
      },
    }),
  };
};
