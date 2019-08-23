import fetchData from '../utils/fetchData';
import onClient from '../../../lib/utilities/onClient';
import getBaseUrl from '../utils/getBaseUrl';

const getMediaPageInitialData = ({ service, serviceId, mediaId }) => {
  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const url = `${baseUrl}/${service}/${serviceId}/${mediaId}.json`;

  return fetchData({ url });
};

export default getMediaPageInitialData;
