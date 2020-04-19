import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import addIdsToBlocks from './addIdsToBlocks';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';

const getLanguage = path(['metadata', 'language']);
const getMetaDataId = path(['metadata', 'id']);
const getPromoName = path(['promo', 'name']);
const getPromoSummary = path(['promo', 'summary']);
const getPageTitle = path(['metadata', 'analyticsLabels', 'pageTitle']);
const getContentType = path(['metadata', 'analyticsLabels', 'contentType']);
const getPageIdentifier = path([
  'metadata',
  'analyticsLabels',
  'pageIdentifier',
]);

export default async ({ path: pathname }) => {
  const { json, ...rest } = await fetchPageData(
    overrideRendererOnTest(pathname),
  );
  const contentData = path(['content'], json);

  return {
    ...rest,
    ...(json && {
      pageData: {
        content: addIdsToBlocks(contentData),
        language: getLanguage(json),
        id: getMetaDataId(json),
        name: getPromoName(json),
        summary: getPromoSummary(json),
        pageTitle: getPageTitle(json),
        contentType: getContentType(json),
        pageIdentifier: getPageIdentifier(json),
      },
    }),
  };
};
