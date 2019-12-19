import Url from 'url-parse';

const AV_ROUTE = 'ws/av-embeds';

const getRequestPath = requestUrl => {
  // Remove trailing /
  return new Url(requestUrl).pathname.substring(1);
};

const getQueryParams = requestUrl => {
  return new Url(requestUrl, true).query;
};

const overrideExists = requestUrl => {
  const params = getQueryParams(requestUrl);

  return (
    params && process.env.APP_ENV !== 'live' && params.renderer_env === 'live'
  );
};

const getBaseUrl = requestUrl => {
  if (overrideExists(requestUrl)) {
    return process.env.SIMORGH_EMBEDS_BASE_URL_OVERRIDE;
  }
  return process.env.SIMORGH_EMBEDS_BASE_URL;
};

const embedUrl = ({ type, requestUrl, isAmp = false }) => {
  const urlParts = [
    getBaseUrl(requestUrl),
    AV_ROUTE,
    type,
    getRequestPath(requestUrl),
  ];

  if (isAmp) {
    urlParts.push('amp');
  }

  return urlParts.join('/');
};

export default embedUrl;
