import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';
import { getQueryString, getUrlPath } from '#lib/utilities/urlParser';
import getBaseUrl from './utils/getBaseUrl';
import onClient from '#lib/utilities/onClient';
import isLive from '#lib/utilities/isLive';
import { DATA_REQUEST_RECEIVED, DATA_NOT_FOUND } from '#lib/logger.const';
import {
  OK,
  BAD_GATEWAY,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from './utils/statusCodes';

const logger = nodeLogger(__filename);

export const getUrl = pathname => {
  if (!pathname) return '';

  const ampRegex = /.amp$/;
  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;
  const params = isLive() ? '' : getQueryString(pathname);
  const basePath = getUrlPath(pathname);

  return `${baseUrl}${basePath.replace(ampRegex, '')}.json${params}`; // Remove .amp at the end of pathnames for AMP pages.
};

const getErrorStatusCode = () =>
  onClient() ? BAD_GATEWAY : INTERNAL_SERVER_ERROR;

export default async pathname => {
  const url = getUrl(pathname);

  logger.info(DATA_REQUEST_RECEIVED, { url });

  try {
    const response = await fetch(url);
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
    } else {
      error.message = `Unexpected upstream response (HTTP status code ${status}) when requesting ${url}`;
    }

    throw error;
  } catch ({ message, status }) {
    const error = new Error(message);
    error.status = status || getErrorStatusCode();
    logger.error(message, {
      url,
      status,
    });

    throw error;
  }
};
