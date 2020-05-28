import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';

const getBrandTitle = path(['metadata', 'title']);
const getLanguage = path(['metadata', 'language']);
const getHeadline = path(['promo', 'headlines', 'headline']);
const getId = path(['metadata', 'id']);
const getShortSynopsis = path(['promo', 'media', 'synopses', 'short']);
const getContentType = path(['metadata', 'analyticsLabels', 'contentType']);
const getPageTitle = path(['metadata', 'analyticsLabels', 'pageTitle']);
const getPageIdentifier = path([
  'metadata',
  'analyticsLabels',
  'pageIdentifier',
]);

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
        ...pageType,
      },
    }),
  };
};
