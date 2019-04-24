import onClient from '../../helpers/onClient';
import getBaseUrl from './getBaseUrl';
import fetchData from './fetchData';

const getInitialData = async ({ match }) => {
  const { id, service, amp } = match.params;
  const isAmp = !!amp;

  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const url = `${baseUrl}/${service}/articles/${id}.json`;

  const { data, status } = await fetchData({ url, preprocessorRules: [] });

  return {
    isAmp,
    data,
    service,
    status,
  };
};

export default getInitialData;
