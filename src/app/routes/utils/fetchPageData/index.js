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
import {
  OK,
  NOT_FOUND,
  UPSTREAM_CODES_TO_PROPAGATE_IN_SIMORGH,
} from '#lib/statusCodes.const';
import getErrorStatusCode from './utils/getErrorStatusCode';

const logger = nodeLogger(__filename);

const baseUrl = onClient()
  ? getBaseUrl(window.location.origin)
  : process.env.SIMORGH_BASE_URL;

export const getUrl = pathname => {
  if (!pathname) return '';

  const ampRegex = /.amp$/;
  const params = isLive() ? '' : getQueryString(pathname);
  const basePath = getUrlPath(pathname);

  return `${baseUrl}${basePath.replace(ampRegex, '')}.json${params}`; // Remove .amp at the end of pathnames for AMP pages.
};

/**
 * An isomorphic fetch wrapper for pages, with error and log handling.
 * @param {string} path The URL of a resource to fetch.
 * @param {...string} loggerArgs Additional arguments for richer logging.
 */
const fetchPageData = async ({ path, timeout, ...loggerArgs }) => {
  const url = path.startsWith('http') ? path : getUrl(path);
  // Defaults to 3000ms, matching the mozart timeout for a
  // response from Simorgh via the Simorgh payload. This is
  // suitable for 'pageData' requests but should probably be
  // lower for 'additional data' that is not essential to
  // the user experience. This ensures Simorgh is free to handle
  // another request once the mozart timeout expires
  const effectiveTimeout = timeout || 3000;

  logger.info(DATA_REQUEST_RECEIVED, {
    data: url,
    path,
    ...loggerArgs,
  });

  try {
    const response = await fetch(url, { timeout: effectiveTimeout });
    const { status } = response;

    if (status === OK) {
      const json = await response.json();

      return {
        status,
        json,
      };
    }

    const error = new Error();

    if (status === NOT_FOUND) {
      error.message = DATA_NOT_FOUND;
      error.status = NOT_FOUND;
    } else {
      error.message = `Unexpected upstream response (HTTP status code ${status}) when requesting ${url}`;
    }

    throw error;
  } catch (aresError) {
    const { message, status } = aresError;
    const simorghError = new Error(message);

    if (UPSTREAM_CODES_TO_PROPAGATE_IN_SIMORGH.includes(status)) {
      simorghError.status = status;
    } else {
      simorghError.status = getErrorStatusCode();
    }

    logger.error(DATA_FETCH_ERROR, {
      data: url,
      status: simorghError.status,
      error: message,
      path,
      ...loggerArgs,
    });

    throw simorghError;
  }
};

export default fetchPageData;
