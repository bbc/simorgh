import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';

const getBrandTitle = path(['metadata', 'title']);
const getLanguage = path(['metadata', 'language']);
const getHeadline = path(['promo', 'headlines', 'headline']);
const getShortSynopsis = path(['promo', 'media', 'synopses', 'short']);
const getReleaseDateTimeStamp = path(['metadata', 'releaseDateTimeStamp']);

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
      },
    }),
  };
};
