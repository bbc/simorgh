import isLive from '../../isLive';

const AV_ROUTE = 'ws/av-embeds';

// On test and live canonical, we use the same base url as the parent page
const LIVE_CANONICAL_URL = '';
const TEST_CANONICAL_URL = '';

// On dev canonical, we load media from the test environment
// This means developers do not need to have the media player infrastructure running
const DEV_CANONICAL_URL = 'https://www.test.bbc.com';

// Amp does not allow iframes to be loaded from the same domain as the parent
// Therefore, we make our media players available on a different domain to bypass this
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

const getBaseUrl = isAmp => {
  const isDev = process.env.SIMORGH_APP_ENV === 'development';
  switch (true) {
    case isLive():
      return isAmp ? LIVE_AMP_URL : LIVE_CANONICAL_URL;
    case isDev:
      return isAmp ? DEV_AMP_URL : DEV_CANONICAL_URL;
    default:
      return isAmp ? TEST_AMP_URL : TEST_CANONICAL_URL;
  }
};

export default ({ type, mediaId, isAmp = false, queryString }) => {
  const morphEnvOverride = shouldOverrideMorphEnv(queryString, type)
    ? '?morph_env=live'
    : '';
  const ampSection = isAmp ? '/amp' : '';
  const baseUrl = getBaseUrl(isAmp);
  const url = `${baseUrl}/${AV_ROUTE}/${type}/${mediaId}`;

  return `${url}${ampSection}${morphEnvOverride}`;
};
