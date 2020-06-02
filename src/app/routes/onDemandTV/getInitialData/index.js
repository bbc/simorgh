import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import getPlaceholderImageUrl from '../../utils/getPlaceholderImageUrl';

const getBrandTitle = path(['metadata', 'title']);
const getLanguage = path(['metadata', 'language']);
const getHeadline = path(['promo', 'headlines', 'headline']);
const getId = path(['metadata', 'id']);
const getShortSynopsis = path(['promo', 'media', 'synopses', 'short']);
const getMasterBrand = path(['metadata', 'createdBy']);
const getContentType = path(['metadata', 'analyticsLabels', 'contentType']);
const getPageTitle = path(['metadata', 'analyticsLabels', 'pageTitle']);
const getPageIdentifier = path([
  'metadata',
  'analyticsLabels',
  'pageIdentifier',
]);
const getEpisodeId = path(['content', 'blocks', 0, 'id']);
const getReleaseDateTimeStamp = path(['metadata', 'releaseDateTimeStamp']);
const getDurationISO8601 = path([
  'promo',
  'media',
  'versions',
  0,
  'durationISO8601',
]);
const getThumbnailImageUrl = json =>
  getPlaceholderImageUrl(path(['promo', 'media', 'imageUrl'], json));
const getPromoBrandTitle = path(['promo', 'brand', 'title']);
const getFirstPublished = path(['metadata', 'firstPublished']);
const getLastPublished = path(['metadata', 'lastPublished']);
export default async ({ path: pathname }) => {
  const onDemandTvDataPath = overrideRendererOnTest(pathname);
  const { json, ...rest } = await fetchPageData(onDemandTvDataPath);
  const pageType = { metadata: { type: 'On Demand TV' } };

  return {
    ...rest,
    ...(json && {
      pageData: {
        language: getLanguage(json),
        brandTitle: getBrandTitle(json),
        id: getId(json),
        headline: getHeadline(json),
        shortSynopsis: getShortSynopsis(json),
        contentType: getContentType(json),
        pageTitle: getPageTitle(json),
        pageIdentifier: getPageIdentifier(json),
        releaseDateTimeStamp: getReleaseDateTimeStamp(json),
        durationISO8601: getDurationISO8601(json),
        thumbnailImageUrl: getThumbnailImageUrl(json),
        promoBrandTitle: getPromoBrandTitle(json),
        masterBrand: getMasterBrand(json),
        episodeId: getEpisodeId(json),
        firstPublished: getFirstPublished(json),
        lastPublished: getLastPublished(json),
        ...pageType,
      },
    }),
  };
};
