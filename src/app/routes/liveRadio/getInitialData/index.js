import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';

const getLanguage = path(['metadata', 'language']);
const getMetaDataId = path(['metadata', 'id']);
const getPromoName = path(['promo', 'name']);
const getPromoSummary = path(['promo', 'summary']);
const getPageTitle = path(['metadata', 'analyticsLabels', 'pageTitle']);
const getContentType = path(['metadata', 'analyticsLabels', 'contentType']);
const getMasterBrand = path(['content', 'blocks', 2, 'externalId']);
const getPageIdentifier = path([
  'metadata',
  'analyticsLabels',
  'pageIdentifier',
]);

const getHeading = path(['content', 'blocks', 0, 'text']);
const getBodySummary = path(['content', 'blocks', 1, 'text']);
const getMasterBrand = path(['content', 'blocks', 2, 'externalId']);

export default async ({ path: pathname }) => {
  const liveRadioDataPath = overrideRendererOnTest(pathname);
  const { json, ...rest } = await fetchPageData(liveRadioDataPath);
  const pageType = { metadata: { type: 'Live Radio' } };

  return {
    ...rest,
    ...(json && {
      pageData: {
        heading: getHeading(json),
        bodySummary: getBodySummary(json),
        language: getLanguage(json),
        masterBrand: getMasterBrand(json),
        id: getMetaDataId(json),
        name: getPromoName(json),
        summary: getPromoSummary(json),
        pageTitle: getPageTitle(json),
        contentType: getContentType(json),
        pageIdentifier: getPageIdentifier(json),
        masterBrand: getMasterBrand(json),
        ...pageType,
      },
    }),
  };
};
