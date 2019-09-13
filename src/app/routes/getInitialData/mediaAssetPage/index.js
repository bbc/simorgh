import onClient from '../../../lib/utilities/onClient';
import getBaseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';
import addHeadingToSTY from '../../../lib/utilities/preprocessor/rules/addHeadingToSTY';
import addTimestampToSTY from '../../../lib/utilities/preprocessor/rules/addTimestampToSTY';

const preprocessorRules = [
  addTimestampToSTY,
  addHeadingToSTY,
];

const getMediaAssetPageInitialData = props => {
  const { service, assetUri } = props;

  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const url = `${baseUrl}/${service}/${assetUri}.json`;

  return fetchData({ url, preprocessorRules });
};

export default getMediaAssetPageInitialData;
