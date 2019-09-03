import onClient from '../../../lib/utilities/onClient';
import { variantSanitzer } from '../../../lib/utilities/variantHandler';
import getBaseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';
import filterUnknownContentTypes from '../../../lib/utilities/preprocessor/rules/filterContentType';
import filterEmptyGroupItems from '../../../lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '../../../lib/utilities/preprocessor/rules/topstories';
import addIdsToItems from '../../../lib/utilities/preprocessor/rules/addIdsToItems';
import filterGroupsWithoutStraplines from '../../../lib/utilities/preprocessor/rules/filterGroupsWithoutStraplines';

const preprocessorRules = [
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  applySquashTopstories,
  filterGroupsWithoutStraplines,
];

const getFrontpageInitialData = async ({ service, variant = '' }) => {
  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const processedVariant = variantSanitzer(variant);

  const url = processedVariant
    ? `${baseUrl}/${service}/${processedVariant}.json`
    : `${baseUrl}/${service}.json`;

  return fetchData({ url, preprocessorRules });
};

export default getFrontpageInitialData;
