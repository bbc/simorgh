import onClient from '../../../lib/utilities/onClient';
import getBaseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';

const getMediaAssetPageInitialData = props => {
  const { service, assetUri } = props;

  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const url = `${baseUrl}/${service}/${assetUri}.json`;

  return fetchData({ url });
};

export default getMediaAssetPageInitialData;
