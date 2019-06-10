import onClient from '../../helpers/onClient';
import getBaseUrl from './utils/getBaseUrl';
import fetchData from './utils/fetchData';
import applyTimestampRules from '../../lib/utilities/preprocessor/rules/timestamp';
import addIdsToBlocks from '../../lib/utilities/preprocessor/rules/addIdsToBlocks';

const getArticleInitialData = async ({ id, service }) => {
  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const url = `${baseUrl}/${service}/articles/${id}.json`;

  return fetchData({
    url,
    preprocessorRules: [applyTimestampRules, addIdsToBlocks],
  });
};

export default getArticleInitialData;
