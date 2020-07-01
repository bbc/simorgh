import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';
import { getQueryString, getUrlPath } from '#lib/utilities/urlParser';
import getBaseUrl from './utils/getBaseUrl';
import onClient from '#lib/utilities/onClient';
import isLive from '#lib/utilities/isLive';
import {
  DATA_REQUEST_RECEIVED,
  DATA_NOT_FOUND,
  DATA_FETCH_ERROR,
} from '#lib/logger.const';

const logger = nodeLogger(__filename);
const STATUS_OK = 200;
const BAD_GATEWAY = 502;
const INTERNAL_SERVER_ERROR = 500;
const STATUS_NOT_FOUND = 404;
const upstreamStatusCodesToPropagate = [STATUS_OK, STATUS_NOT_FOUND];

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

const validateData = data => {
  if (data) {
    return 'content' in data;
  }

  return false;
};

const handleResponse = url => async response => {
  const { status } = response;

  if (upstreamStatusCodesToPropagate.includes(status)) {
    const json = await response.json();
    const dataIsValid = validateData(json);

    if (status === STATUS_NOT_FOUND) {
      logger.error(DATA_NOT_FOUND, {
        url,
        status,
      });

      return { status, error: DATA_NOT_FOUND };
    }

    if (!dataIsValid) {
      throw new Error(
        `Unexpected data format in response when requesting ${url}`,
      );
    }

    return {
      status,
      json,
    };
  }

  throw new Error(
    `Unexpected upstream response (HTTP status code ${status}) when requesting ${url}`,
  );
};

const handleError = e => {
  const errorMessage = e.toString();
  const error = new Error(errorMessage);
  error.status = onClient() ? BAD_GATEWAY : INTERNAL_SERVER_ERROR;

  logger.error(DATA_FETCH_ERROR, { error: errorMessage });

  throw error;
};

const fetchData = pathname => {
  const url = getUrl(pathname);

  logger.info(DATA_REQUEST_RECEIVED, { url });

  return fetch(url).then(handleResponse(url)).catch(handleError);
};

export default fetchData;
