import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';
import onClient from '#lib/utilities/onClient';
import { getQueryString, getUrlPath } from '#lib/utilities/urlParser';
import getBaseUrl from './getBaseUrl';

const logger = nodeLogger(__filename);
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_GATEWAY = 502;
const STATUS_CODE_NOT_FOUND = 404;
const upstreamStatusCodesToPropagate = [STATUS_CODE_OK, STATUS_CODE_NOT_FOUND];

const ampRegex = /(.amp)$/;

const baseUrl = onClient()
  ? getBaseUrl(window.location.origin)
  : process.env.SIMORGH_BASE_URL;

export const getUrl = pathname => {
  if (!pathname) return '';

  let params = '';

  if (process.env.APP_ENV !== 'live') {
    params = getQueryString(pathname);
  }

  const basePath = getUrlPath(pathname);

  return `${baseUrl}${basePath.replace(ampRegex, '')}.json${params}`;
};

const handleResponse = async response => {
  const { status } = response;

  if (status === STATUS_CODE_OK) {
    const pageData = await response.json();

    console.log('xxxx', pageData);

    return {
      status,
      pageData,
    };
  }

  return { status };
};

const checkForError = pathname => ({ status, pageData }) => {
  const isHandledStatus = upstreamStatusCodesToPropagate.includes(status);

  if (isHandledStatus) {
    return { status, pageData };
  }
  logger.warn(
    `Unexpected upstream response (HTTP status code ${status}) when requesting ${pathname}`,
  );
  throw new Error();
};

const handleError = error => {
  if (error.message) {
    logger.error(error.message);
  }
  return { error, status: STATUS_CODE_BAD_GATEWAY };
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
