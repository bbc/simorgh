import onClient from '../../../lib/utilities/onClient';
import getBaseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';
import applyTimestampRules from '../../../lib/utilities/preprocessor/rules/timestamp';
import addIdsToBlocks from '../../../lib/utilities/preprocessor/rules/addIdsToBlocks';
import applyBlockPositioning from '../../../lib/utilities/preprocessor/rules/blockPositioning';

const getArticleInitialData = async ({ id, service, variant = '' }) => {
  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  // NB: If set, variant has a leading '/'

  const url = `${baseUrl}/${service}/articles/${id}${variant}.json`;

  return fetchData({
    url,
    preprocessorRules: [
      applyTimestampRules,
      addIdsToBlocks,
      applyBlockPositioning,
    ],
  });
};

export default getArticleInitialData;
