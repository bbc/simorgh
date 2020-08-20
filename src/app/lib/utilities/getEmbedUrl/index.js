import isLive from '../isLive';

const AV_ROUTE = 'ws/av-embeds';

const LIVE_CANONICAL_URL = 'https://bbc.co.uk';
const LIVE_AMP_URL = 'https://polling.bbc.co.uk';
const TEST_CANONICAL_URL = 'https://test.bbc.co.uk';
const TEST_AMP_URL = 'https://polling.test.bbc.co.uk';

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
  if (isLive() && isAmp) return LIVE_AMP_URL;
  if (isAmp) return TEST_AMP_URL;
  if (isLive()) return LIVE_CANONICAL_URL;
  return TEST_CANONICAL_URL;
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
