import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';
import preprocess from '#lib/utilities/preprocessor';
import onClient from '#lib/utilities/onClient';
import getBaseUrl from '../getBaseUrl';

const logger = nodeLogger(__filename);
const upstreamStatusCodesToPropagate = [200, 404];

const ampRegex = /(.amp)/g;

const fetchData = async ({ pathname, preprocessorRules }) => {
  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;
  const url = `${baseUrl}${pathname.replace(ampRegex, '')}.json`;
  console.log('fetch url', url);

  let pageData;
  let status;

  try {
    const response = await fetch(url);

    status = response.status; // eslint-disable-line prefer-destructuring

    if (status === 200) {
      pageData = await response.json();
      pageData = preprocess(pageData, preprocessorRules);
    } else if (!upstreamStatusCodesToPropagate.includes(status)) {
      logger.warn(
        `Unexpected upstream response (HTTP status code ${status}) when requesting ${url}`,
      );
      status = 502;
    }
  } catch (error) {
    logger.error(error);
    status = 502;
  }

  return { pageData, status };
};

export default fetchData;
