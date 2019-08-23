import fetchData from '../utils/fetchData';
import onClient from '../../../lib/utilities/onClient';
import getBaseUrl from '../utils/getBaseUrl';

const getMediaPageInitialData = props => {
  const { service, mediaId } = props;
  let { serviceId } = props;

  if (serviceId === 'bbc_oromo_radio') {
    serviceId = 'bbc_afaanoromo_radio';
  }

  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const url = `${baseUrl}/${service}/${serviceId}/${mediaId}.json`;

  return fetchData({ url });
};

export default getMediaPageInitialData;
