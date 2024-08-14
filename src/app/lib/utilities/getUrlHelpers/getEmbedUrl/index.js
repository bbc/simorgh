import isLive from '../../isLive';
import { getEnvConfig } from '../../getEnvConfig';

const AV_ROUTE = 'ws/av-embeds';

const LIVE_BASE_URL = 'https://www.bbc.com';
const TEST_BASE_URL = 'https://www.test.bbc.com';
const DEV_BASE_URL = TEST_BASE_URL;

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

const getBaseUrl = () => {
  // In some scenarios, we use the same base URL as the parent
  const relativeBaseUrl = '';
  switch (true) {
    case isLive():
      return relativeBaseUrl;
    case isDev():
      return DEV_BASE_URL;
    default:
      return relativeBaseUrl;
  }
};

export default ({ type, mediaId, queryString }) => {
  const morphEnvOverride = shouldOverrideMorphEnv(queryString, type)
    ? '?morph_env=live'
    : '';
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${AV_ROUTE}/${type}/${mediaId}`;
  return `${url}${morphEnvOverride}`;
};

export const makeAbsolute = url => {
  const replacementString = isLive() ? LIVE_BASE_URL : TEST_BASE_URL;

  return url.replace(/^\//, `${replacementString}/`);
};
