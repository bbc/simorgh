import onClient from '../../../lib/utilities/onClient';
import getBaseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';
import { variantSanitiser } from '../../../lib/utilities/variantHandler';
import convertCpsBlocksToOptimoBlocks from '#lib/utilities/preprocessor/rules/cpsAsset/convertCpsBlocksToOptimoBlocks';
import addHeadlineBlock from '#lib/utilities/preprocessor/rules/cpsAsset/addHeadlineBlock';
import addTimestampBlock from '#lib/utilities/preprocessor/rules/article/timestamp';

const getMediaAssetPageInitialData = async ({ service, variant, assetUri }) => {
  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const processedVariant = variantSanitiser(variant);

  const url = processedVariant
    ? `${baseUrl}/${service}/${assetUri}/${processedVariant}.json`
    : `${baseUrl}/${service}/${assetUri}.json`;

  return fetchData({
    url,
    preprocessorRules: [convertCpsBlocksToOptimoBlocks, addHeadlineBlock, addTimestampBlock],
  });
};

export default getMediaAssetPageInitialData;
