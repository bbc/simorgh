import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

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

export default async ({ path: pathname, pageType }) => {
  try {
    const liveRadioDataPath = overrideRendererOnTest(pathname);
    const { json, status } = await fetchPageData({
      path: liveRadioDataPath,
      pageType,
    });

    return {
      status,
      pageData: {
        heading: getHeading(json),
        bodySummary: getBodySummary(json),
        language: getLanguage(json),
        id: getMetaDataId(json),
        name: getPromoName(json),
        summary: getPromoSummary(json),
        pageTitle: getPageTitle(json),
        contentType: getContentType(json),
        pageIdentifier: getPageIdentifier(json),
        masterBrand: getMasterBrand(json),
        metadata: { type: 'Live Radio' },
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
