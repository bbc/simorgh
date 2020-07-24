import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';
import {
  DATA_REQUEST_RECEIVED,
  DATA_NOT_FOUND,
  DATA_FETCH_ERROR,
} from '#lib/logger.const';
import {
  OK,
  NOT_FOUND,
  UPSTREAM_CODES_TO_PROPAGATE_IN_SIMORGH,
} from './utils/statusCodes';
import sendCustomMetric from '#lib/utilities/customMetrics';
import { NON_200_RESPONSE } from '#lib/utilities/customMetrics/metrics.const';
import getErrorStatusCode from './utils/getErrorStatusCode';
import getUrl from './utils/getUrl';
import onClient from '#app/lib/utilities/onClient';

const logger = nodeLogger(__filename);

export default async ({ path, pageType }) => {
  const url = getUrl(path);

  logger.info(DATA_REQUEST_RECEIVED, { path, pageType, data: url });

  try {
    const response = await fetch(url);
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
      path,
      data: url,
      status: simorghError.status,
      error: message,
      pageType,
    });

    if (!onClient()) {
      sendCustomMetric({
        metricName: NON_200_RESPONSE,
        statusCode: simorghError.status,
        pageType,
        requestUrl: path,
      });
    }

    throw simorghError;
  }
};
