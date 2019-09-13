import onClient from '../../../lib/utilities/onClient';
import getBaseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';
import addHeadingToSTY from '../../../lib/utilities/preprocessor/rules/addHeadingToSTY';
import addTimestampToSTY from '../../../lib/utilities/preprocessor/rules/addTimestampToSTY';
import addAttributesToSTYTextBlocks from '../../../lib/utilities/preprocessor/rules/addAttributesToSTYTextBlocks';

const preprocessorRules = [
  addTimestampToSTY,
  addHeadingToSTY,
  addAttributesToSTYTextBlocks,
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
