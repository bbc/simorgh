import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';
import onClient from '#lib/utilities/onClient';
import { getQueryString, getUrlPath } from '#lib/utilities/urlParser';
import getBaseUrl from './utils/getBaseUrl';
import isLive from '#lib/utilities/isLive';

const logger = nodeLogger(__filename);
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_GATEWAY = 502;
const STATUS_CODE_INTERNAL_SERVER_ERROR = 500;
const STATUS_CODE_NOT_FOUND = 404;
const upstreamStatusCodesToPropagate = [STATUS_CODE_OK, STATUS_CODE_NOT_FOUND];

const ampRegex = /(.amp)$/;

const baseUrl = onClient()
  ? getBaseUrl(window.location.origin)
  : process.env.SIMORGH_BASE_URL;

export const getUrl = pathname => {
  if (!pathname) return '';

  const params = isLive() ? '' : getQueryString(pathname);

  const basePath = getUrlPath(pathname);

  return `${baseUrl}${basePath.replace(ampRegex, '')}.json${params}`;
};

const handleResponse = async response => {
  const { status } = response;
  const isOK = status === STATUS_CODE_OK;

  return {
    status,
    ...(isOK && { pageData: await response.json() }),
  };
};

const checkForError = pathname => ({ status, pageData }) => {
  const isHandledStatus = upstreamStatusCodesToPropagate.includes(status);

  if (isHandledStatus) {
    return { status, pageData };
  }
  logger.error(
    `Unexpected upstream response (HTTP status code ${status}) when requesting ${pathname}`,
  );
  throw new Error();
};

const handleError = error => {
  if (error.message) {
    logger.error(error.message);
  }

  const status = onClient()
    ? STATUS_CODE_BAD_GATEWAY
    : STATUS_CODE_INTERNAL_SERVER_ERROR;

  return { error, status };
};

const fetchData = pathname => {
  const url = getUrl(pathname); // Remove .amp at the end of pathnames for AMP pages.
  logger.info(`DataRequest: [${url}]`);

  return fetch(url)
    .then(handleResponse)
    .then(checkForError(url))
    .catch(handleError);
};

export default fetchData;
