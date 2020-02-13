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

const isOK = status => status === STATUS_CODE_OK;

export const getUrl = pathname => {
  if (!pathname) return '';

  const params = isLive() ? '' : getQueryString(pathname);
  const basePath = getUrlPath(pathname);

  return `${baseUrl}${basePath.replace(ampRegex, '')}.json${params}`; // Remove .amp at the end of pathnames for AMP pages.
};

const getStatus = (status, pathname) => {
  logger.error(
    `Unexpected upstream response (HTTP status code ${status}) when requesting ${pathname}`,
  );

  return onClient()
    ? STATUS_CODE_BAD_GATEWAY
    : STATUS_CODE_INTERNAL_SERVER_ERROR;
};

export default async pathname => {
  const url = getUrl(pathname);
  const response = await fetch(url);
  const { status } = response;

  logger.info(`DataRequest: [${url}]`);

  return {
    status: upstreamStatusCodesToPropagate.includes(status)
      ? status
      : getStatus(status, pathname),
    ...(isOK(status) && { json: await response.json() }),
  };
};
