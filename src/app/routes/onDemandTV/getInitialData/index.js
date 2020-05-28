import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import getPlaceholderImageUrlUtil from '../../utils/getPlaceholderImageUrl';

const getBrandTitle = path(['metadata', 'title']);
const getLanguage = path(['metadata', 'language']);
const getHeadline = path(['promo', 'headlines', 'headline']);
const getMasterBrand = path(['metadata', 'createdBy']);
const getEpisodeId = path(['content', 'blocks', 0, 'id']);
const getShortSynopsis = path(['promo', 'media', 'synopses', 'short']);
const getReleaseDateTimeStamp = path(['metadata', 'releaseDateTimeStamp']);
const getDurationISO8601 = path([
  'promo',
  'media',
  'versions',
  0,
  'durationISO8601',
]);
const getThumbnailImageUrl = json =>
  getPlaceholderImageUrlUtil(path(['promo', 'media', 'imageUrl'], json));
const getPromoBrandTitle = path(['promo', 'brand', 'title']);

export default async ({ path: pathname }) => {
  const onDemandTvDataPath = overrideRendererOnTest(pathname);
  const { json, ...rest } = await fetchPageData(onDemandTvDataPath);

  return {
    ...rest,
    ...(json && {
      pageData: {
        language: getLanguage(json),
        brandTitle: getBrandTitle(json),
        headline: getHeadline(json),
        shortSynopsis: getShortSynopsis(json),
        releaseDateTimeStamp: getReleaseDateTimeStamp(json),
        durationISO8601: getDurationISO8601(json),
        thumbnailImageUrl: getThumbnailImageUrl(json),
        promoBrandTitle: getPromoBrandTitle(json),
        masterBrand: getMasterBrand(json),
        episodeId: getEpisodeId(json),
      },
    }),
  };
};
