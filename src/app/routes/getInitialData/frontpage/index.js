import onClient from '../../../lib/utilities/onClient';
import getBaseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';
import filterUnknownCpsTypes from '../../../lib/utilities/preprocessor/rules/cpstypes';
import filterEmptyGroupItems from '../../../lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '../../../lib/utilities/preprocessor/rules/topstories';

const preprocessorRules = [
  filterUnknownCpsTypes,
  filterEmptyGroupItems,
  applySquashTopstories,
];

const getFrontpageInitialData = async (service, variant) => {
  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  console.log(`service Var: ${JSON.stringify(variant)}`);

  const serviceUrl = variant ? `${service}/${variant}` : service;
  const url = `${baseUrl}/${serviceUrl}.json`;

  return fetchData({ url, preprocessorRules });
};

export default getFrontpageInitialData;
