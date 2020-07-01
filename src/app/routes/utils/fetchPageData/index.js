import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';
import { getQueryString, getUrlPath } from '#lib/utilities/urlParser';
import getBaseUrl from './utils/getBaseUrl';
import onClient from '#lib/utilities/onClient';
import isLive from '#lib/utilities/isLive';
import { DATA_REQUEST_RECEIVED, DATA_NOT_FOUND } from '#lib/logger.const';

const logger = nodeLogger(__filename);
const OK = 200;
const BAD_GATEWAY = 502;
const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;

const ampRegex = /.amp$/;

const baseUrl = onClient()
  ? getBaseUrl(window.location.origin)
  : process.env.SIMORGH_BASE_URL;

export const getUrl = pathname => {
  if (!pathname) return '';

  const params = isLive() ? '' : getQueryString(pathname);
  const basePath = getUrlPath(pathname);

  return `${baseUrl}${basePath.replace(ampRegex, '')}.json${params}`; // Remove .amp at the end of pathnames for AMP pages.
};

const handleResponse = url => async response => {
  const { status } = response;
  const json = await response.json();

  if (status === OK) {
    return {
      status,
      json,
    };
  }

  const error = new Error();

  if (status === NOT_FOUND) {
    error.message = DATA_NOT_FOUND;
    error.status = NOT_FOUND;

    throw error;
  }

  error.message = `Unexpected upstream response (HTTP status code ${status}) when requesting ${url}`;

  throw error;
};

const handleError = url => ({ message, status }) => {
  const error = new Error(message);
  error.status = status || (onClient() ? BAD_GATEWAY : INTERNAL_SERVER_ERROR);

  logger.error(message, {
    url,
    status,
  });

  throw error;
};

const fetchData = pathname => {
  const url = getUrl(pathname);

  logger.info(DATA_REQUEST_RECEIVED, { url });

  return fetch(url).then(handleResponse(url)).catch(handleError(url));
};

export default fetchData;
