import pathOr from 'ramda/src/pathOr';
import isLive from '../isLive';

const AV_ROUTE = 'ws/av-embeds';

const LIVE_CANONICAL_URL = 'https://bbc.com';
const LIVE_AMP_URL = 'https://polling.bbc.co.uk';
const TEST_CANONICAL_URL = 'https://test.bbc.com';
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
  if (isAmp) {
    return isLive() ? LIVE_AMP_URL : TEST_AMP_URL;
  }
  return isLive() ? LIVE_CANONICAL_URL : TEST_CANONICAL_URL;
};

export const getEmbedUrl = ({ type, mediaId, isAmp = false, queryString }) => {
  const morphEnvOverride = shouldOverrideMorphEnv(queryString, type)
    ? '?morph_env=live'
    : '';
  const ampSection = isAmp ? '/amp' : '';
  const baseUrl = getBaseUrl(isAmp);
  const url = `${baseUrl}/${AV_ROUTE}/${type}/${mediaId}`;

  return `${url}${ampSection}${morphEnvOverride}`;
};

export const getBrandedImage = (locator, service) =>
  `${process.env.SIMORGH_ICHEF_BASE_URL}/news/1024/branded_${service}/${locator}`;

export const getMostReadEndpoint = ({ service, variant }) =>
  variant
    ? `/${service}/mostread/${variant}.json`
    : `/${service}/mostread.json`;

export const getLocalMostReadEndpoint = ({ service, variant = 'default' }) =>
  `./data/${service}/mostRead/${
    variant === 'default' ? 'index' : variant
  }.json`;

export const getMasterBrand = (externalId, liveRadioIdOverrides) =>
  pathOr(externalId, ['masterBrand', externalId], liveRadioIdOverrides);

export const getRadioScheduleEndpoint = ({
  service,
  radioService = service,
  env,
  queryString,
  baseUrl = '',
}) => {
  const query = env !== 'live' && queryString ? queryString : '';

  return `${baseUrl}/${service}/bbc_${radioService}_radio/schedule.json${query}`;
};

export const getLocalRadioScheduleEndpoint = ({
  service,
  radioService = service,
}) => `./data/${service}/bbc_${radioService}_radio/schedule.json`;
