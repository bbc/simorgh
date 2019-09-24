import onClient from '../../../lib/utilities/onClient';
import getBaseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';
import { variantSanitiser } from '../../../lib/utilities/variantHandler';
import addIdsToBlocks from '#lib/utilities/preprocessor/rules/convertHeadingsToSubheadings';
import addCPSHeadingBlock from '#lib/utilities/preprocessor/rules/addCPSHeadingBlock';

const preprocessorRules = [
  addIdsToBlocks,
  addCPSHeadingBlock
];

const getMediaAssetPageInitialData = async ({ service, variant, assetUri }) => {
  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const processedVariant = variantSanitiser(variant);

  const url = processedVariant
    ? `${baseUrl}/${service}/${assetUri}/${processedVariant}.json`
    : `${baseUrl}/${service}/${assetUri}.json`;

  return fetchData({ url, preprocessorRules });
};

export default getMediaAssetPageInitialData;
