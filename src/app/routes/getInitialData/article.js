import onClient from '../../helpers/onClient';
import getBaseUrl from './utils/getBaseUrl';
import fetchData from './utils/fetchData';

const getArticleInitialData = async ({ match }) => {
  const { id, service } = match.params;

  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const url = `${baseUrl}/${service}/articles/${id}.json`;

  const { pageData, status } = await fetchData({ url });

  return {
    pageData,
    status,
  };
};

export default getArticleInitialData;
