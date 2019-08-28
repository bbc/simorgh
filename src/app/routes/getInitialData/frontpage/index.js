import onClient from '../../../lib/utilities/onClient';
import getBaseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';
import filterUnknownContentTypes from '../../../lib/utilities/preprocessor/rules/filterContentType';
import filterEmptyGroupItems from '../../../lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '../../../lib/utilities/preprocessor/rules/topstories';
import addIdsToItems from '../../../lib/utilities/preprocessor/rules/addIdsToItems';
import filterGroupsWithoutStraplines from '../../../lib/utilities/preprocessor/rules/filterGroupsWithoutStraplines';

const preprocessorRules = [
  filterUnknownContentTypes,
  addIdsToItems,
  filterEmptyGroupItems,
  applySquashTopstories,
  filterGroupsWithoutStraplines,
];

const getFrontpageInitialData = async ({ service }) => {
  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const url = `${baseUrl}/${service}.json`;

  return fetchData({ url, preprocessorRules });
};

export default getFrontpageInitialData;
