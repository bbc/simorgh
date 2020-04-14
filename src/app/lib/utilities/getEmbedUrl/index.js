import isLive from '../isLive';

const AV_ROUTE = 'ws/av-embeds';

const LIVE_URL = 'https://polling.bbc.co.uk';
const TEST_URL = 'https://polling.test.bbc.co.uk';

const shouldOverrideMorphEnv = (queryString) => {
  if (isLive()) return false;
  return Boolean(queryString) && queryString.includes('renderer_env=live');
};

export default ({ type, mediaId, isAmp = false, queryString }) => {
  const morphEnvOverride = shouldOverrideMorphEnv(queryString)
    ? '?morph_env=live'
    : '';
  const ampSection = isAmp ? '/amp' : '';
  const baseUrl = isLive() ? LIVE_URL : TEST_URL;
  const url = `${baseUrl}/${AV_ROUTE}/${type}/${mediaId}`;

  return `${url}${ampSection}${morphEnvOverride}`;
};
