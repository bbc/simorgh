import isLive from '../../isLive';
import { getEnvConfig } from '../../getEnvConfig';

const AV_ROUTE = 'ws/av-embeds';

const LIVE_BASE_URL = 'https://www.bbc.com';
const TEST_BASE_URL = 'https://www.test.bbc.com';
const DEV_BASE_URL = TEST_BASE_URL;

const LIVE_AMP_URL = 'https://polling.bbc.co.uk';
const TEST_AMP_URL = 'https://polling.test.bbc.co.uk';
const DEV_AMP_URL = TEST_AMP_URL;

const shouldOverrideMorphEnv = (queryString, type) => {
  if (isLive()) return false;

  const hasQueryString = Boolean(queryString);
  const isLiveRendererEnv =
    hasQueryString && queryString.includes('renderer_env=live');
  const isMediaType = type === 'media';

  if (isLiveRendererEnv) {
    return true;
  }

  return isMediaType;
};

const isDev = () => getEnvConfig().SIMORGH_APP_ENV === 'local';

const getBaseUrl = (queryString, isAmp) => {
  // In some scenarios, we use the same base URL as the parent
  const relativeBaseUrl = '';
  switch (true) {
    case isLive():
      return isAmp ? LIVE_AMP_URL : relativeBaseUrl;
    case isDev():
      return isAmp ? DEV_AMP_URL : DEV_BASE_URL;
    default:
      return isAmp ? TEST_AMP_URL : relativeBaseUrl;
  }
};

export default ({ type, mediaId, isAmp = false, queryString }) => {
  const morphEnvOverride = shouldOverrideMorphEnv(queryString, type)
    ? '?morph_env=live'
    : '';
  const ampSection = isAmp ? '/amp' : '';
  const baseUrl = getBaseUrl(queryString, isAmp);
  const url = `${baseUrl}/${AV_ROUTE}/${type}/${mediaId}`;
  return `${url}${ampSection}${morphEnvOverride}`;
};

export const makeAbsolute = url => {
  const replacementString = isLive() ? LIVE_BASE_URL : TEST_BASE_URL;

  return url.replace(/^\//, `${replacementString}/`);
};
