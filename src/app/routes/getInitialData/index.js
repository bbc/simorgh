import 'isomorphic-fetch';
import path from 'ramda/src/path';
import nodeLogger from '#lib/logger.node';
import preprocess from '#lib/utilities/preprocessor';
import onClient from '#lib/utilities/onClient';
import getBaseUrl from './utils/getBaseUrl';
import getPreprocessorRules from './utils/getPreprocessorRules';

export const logger = nodeLogger(__filename);
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_GATEWAY = 502;
const STATUS_CODE_NOT_FOUND = 404;
const upstreamStatusCodesToPropagate = [STATUS_CODE_OK, STATUS_CODE_NOT_FOUND];
const validRendererEnvironments = ['int', 'test', 'live'];

const ampRegex = /(.amp)$/;

const baseUrl = onClient()
  ? getBaseUrl(window.location.origin)
  : process.env.SIMORGH_BASE_URL;

// eslint-disable-next-line consistent-return
export const getUrl = pathname => {
  if (pathname) {
    const regex = /renderer_env=(.*)&?/i;
    const [match, environment] = pathname.match(regex) || [];
    let finalPath = pathname;
    let params =
      pathname.lastIndexOf('?') > 0
        ? pathname.substring(pathname.lastIndexOf('?'))
        : '';

    if (params) {
      finalPath = pathname.substring(0, pathname.indexOf(params));

      if (match) {
        params = params.replace(match, match.toLowerCase());
        if (!validRendererEnvironments.includes(environment.toLowerCase())) {
          logger.warn(
            `Invalid parameter value [${match}]. Usage: renderer_env=${validRendererEnvironments.join(
              '|',
            )}`,
          );
        }
      }
    }

    return `${baseUrl}${finalPath.replace(ampRegex, '')}.json${params}`;
  }
};

const handleResponse = async response => {
  const { status } = response;

  if (status === STATUS_CODE_OK) {
    const pageData = await response.json();
    const type = path(['metadata', 'type'], pageData);
    const processedPageData = await preprocess(
      pageData,
      getPreprocessorRules(type),
    );

    return {
      status,
      pageData: processedPageData,
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

const fetchData = pathname =>
  fetch(getUrl(pathname)) // Remove .amp at the end of pathnames for AMP pages.
    .then(handleResponse)
    .then(checkForError(getUrl(pathname)))
    .catch(handleError);

export default fetchData;
