import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';
import {
  DATA_FETCH_RESPONSE_TIME,
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
import { PRIMARY_DATA_TIMEOUT } from '#app/lib/utilities/getFetchTimeouts';
import onClient from '#lib/utilities/onClient';
import getUrl from './utils/getUrl';

const logger = nodeLogger(__filename);

/**
 * An isomorphic fetch wrapper for pages, with error and log handling.
 * @param {string} path The URL of a resource to fetch.
 * @param {number} timeout Optional parameter to provide a custom timeout
 * for request for 'secondary data'. The fetch timeout defaults to the 'primary
 * data' timeout if this is not provided.
 * Timeout values here: https://github.com/bbc/simorgh/blob/latest/src/app/lib/utilities/getFetchTimeouts/index.js
 * @param {...string} loggerArgs Additional arguments for richer logging.
 */
const fetchPageData = async ({
  path,
  timeout,
  shouldLogFetchTime = !onClient(),
  ...loggerArgs
}) => {
  const url = path.startsWith('http') ? path : getUrl(path);
  const effectiveTimeout = timeout || PRIMARY_DATA_TIMEOUT;

  logger.info(DATA_REQUEST_RECEIVED, {
    data: url,
    path,
    ...loggerArgs,
  });

  const canDetermineFetchTime = process && typeof process.hrtime === 'function';

  try {
    const startHrTime = canDetermineFetchTime ? process.hrtime() : [0, 0];
    const response = await fetch(url, { timeout: effectiveTimeout });
    const { status } = response;

    if (shouldLogFetchTime && canDetermineFetchTime) {
      const NS_PER_SEC = 1e9;
      const elapsedHrTime = process.hrtime(startHrTime);
      logger.info(DATA_FETCH_RESPONSE_TIME, {
        path,
        nanoseconds: elapsedHrTime[0] * NS_PER_SEC + elapsedHrTime[1],
      });
    }

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
