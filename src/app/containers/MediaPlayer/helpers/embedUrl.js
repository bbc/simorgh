import { getUrlPath, getParsedQueryString } from '#lib/utilities/urlParser';

const AV_ROUTE = 'ws/av-embeds';

const isLive = () => {
  return process.env.APP_ENV === 'live';
};

const liveOverrideExists = requestUrl => {
  const params = getParsedQueryString(requestUrl);

  return params && !isLive() && params.renderer_env === 'live';
};

const getBaseUrl = requestUrl => {
  if (liveOverrideExists(requestUrl) || isLive()) {
    return process.env.SIMORGH_EMBEDS_BASE_URL_LIVE;
  }
  return process.env.SIMORGH_EMBEDS_BASE_URL_TEST;
};

const embedUrl = ({ type, requestUrl, isAmp = false }) => {
  const urlParts = [
    getBaseUrl(requestUrl),
    AV_ROUTE,
    `${type}${getUrlPath(requestUrl)}`,
  ];

  if (isAmp) {
    urlParts.push('amp');
  }

  return urlParts.join('/');
};

export default embedUrl;
