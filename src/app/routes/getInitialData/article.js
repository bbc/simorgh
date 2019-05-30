import onClient from '../../helpers/onClient';
import getBaseUrl from './utils/getBaseUrl';
import fetchData from './utils/fetchData';

const getArticleInitialData = async ({ id, service }) => {
  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const url = `${baseUrl}/${service}/articles/${id}.json`;

  return fetchData({ url });
};

export default getArticleInitialData;
