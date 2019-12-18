import Url from 'url-parse';
import QS from 'querystringify';

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

const getParts = (type, requestUrl, isAmp) => {
  const parts = [
    getBaseUrl(requestUrl),
    AV_ROUTE,
    type,
    getRequestPath(requestUrl),
  ];

  if (isAmp) {
    parts.push('amp');
  }

  return parts;
};

const getUrl = (type, requestUrl, isAmp) => {
  const parts = getParts(type, requestUrl, isAmp);
  return parts.join('/');
};

const embedUrl = ({ type, requestUrl, isAmp = false }) => {
  let url = getUrl(type, requestUrl, isAmp);

  if (overrideExists(requestUrl)) {
    url += QS.stringify(getQueryParams(requestUrl), true);
  }

  return url;
};

export default embedUrl;
