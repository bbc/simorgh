import onClient from '../../helpers/onClient';
import getBaseUrl from './utils/getBaseUrl';
import fetchData from './utils/fetchData';
import filterUnknownCpsTypes from '../../lib/utilities/preprocessor/rules/cpstypes';
import filterEmptyGroupItems from '../../lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '../../lib/utilities/preprocessor/rules/topstories';

const preprocessorRules = [
  filterUnknownCpsTypes,
  filterEmptyGroupItems,
  applySquashTopstories,
];

const getFrontpageInitialData = async ({ match }) => {
  const { service } = match.params;

  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const url = `${baseUrl}/${service}.json`;

  return fetchData({ url, preprocessorRules });
};

export default getFrontpageInitialData;
