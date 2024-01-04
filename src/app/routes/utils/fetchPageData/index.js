import nodeLogger from '#lib/logger.node';
import {
  DATA_FETCH_RESPONSE_TIME,
  DATA_REQUEST_RECEIVED,
  DATA_NOT_FOUND,
  DATA_FETCH_ERROR,
  DATA_RESPONSE_FROM_CACHE,
} from '#lib/logger.const';
import {
  OK,
  NOT_FOUND,
  UPSTREAM_CODES_TO_PROPAGATE_IN_SIMORGH,
} from '#lib/statusCodes.const';
import { PRIMARY_DATA_TIMEOUT } from '#app/lib/utilities/getFetchTimeouts';
import onClient from '#lib/utilities/onClient';
import isLocal from '#app/lib/utilities/isLocal';
import getErrorStatusCode from './utils/getErrorStatusCode';
import getUrl from './utils/getUrl';

const logger = nodeLogger(__filename);

/**
 * A fetch wrapper for pages, with error and log handling.
 * @param {string} path The URL of a resource to fetch.
 * @param {number} timeout Optional parameter to provide a custom timeout
 * for request for 'secondary data'. The fetch timeout defaults to the 'primary
 * data' timeout if this is not provided.
 * Timeout values here: https://github.com/bbc/simorgh/blob/latest/src/app/lib/utilities/getFetchTimeouts/index.js
 * @param {boolean} shouldLogFetchTime Optional parameter to provide a true/false if the fetch time should be logged.
 * @param {object} agent Optional parameter to provide an agent object with the fetch
 * @param {object} optHeaders Optional parameter to provide additional headers to the fetch
 * @param {...string} loggerArgs Additional arguments for richer logging.
 */
const fetchPageData = async ({
  path,
  timeout,
  shouldLogFetchTime = !onClient(),
  agent,
  optHeaders,
  cache,
  ...loggerArgs
}) => {
  const url = path.startsWith('http') ? path : getUrl(path);

  logger.debug(DATA_REQUEST_RECEIVED, {
    data: url,
    path,
    ...loggerArgs,
  });

  const cachedResponse = !isLocal() && cache?.get(url);

  if (cachedResponse) {
    logger.debug(DATA_RESPONSE_FROM_CACHE, {
      data: url,
      path,
      ...loggerArgs,
    });

    return {
      status: 200,
      json: cachedResponse,
    };
  }

  const effectiveTimeout = timeout || PRIMARY_DATA_TIMEOUT;
  const fetchOptions = {
    headers: {
      'User-Agent': 'Simorgh/ws-web-rendering',
      ...(optHeaders && optHeaders),
    },
    signal: AbortSignal.timeout(effectiveTimeout),
    ...(agent && { agent }),
  };

  const canDetermineFetchTime = process && typeof process.hrtime === 'function';

  try {
    const startHrTime = canDetermineFetchTime ? process.hrtime() : [0, 0];
    const response = await fetch(url, fetchOptions);
    const { status } = response;

    if (shouldLogFetchTime && canDetermineFetchTime) {
      const NS_PER_SEC = 1e9;
      const elapsedHrTime = process.hrtime(startHrTime);
      logger.debug(DATA_FETCH_RESPONSE_TIME, {
        path,
        status,
        nanoseconds: elapsedHrTime[0] * NS_PER_SEC + elapsedHrTime[1],
        ...loggerArgs,
      });
    }
    if (status === OK) {
      const json = await response.json();

      if (cache) {
        cache.set(url, json);
      }

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
