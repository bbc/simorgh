import 'isomorphic-fetch';
import nodeLogger from '../../helpers/logger.node';
import getBaseUrl from './getBaseUrl';

const logger = nodeLogger(__filename);

const upstreamStatusCodesToPropagate = [200, 404];

const getInitialData = async ({ match }) => {
  const { id, service, amp } = match.params;
  const isAmp = !!amp;
  let data;
  let status;
  let baseUrl = process.env.SIMORGH_BASE_URL;

  if (window && window.location) {
    baseUrl = getBaseUrl(window.location.origin);
  }

  const url = `${baseUrl}/${service}/articles/${id}.json`;

  try {
    const response = await fetch(url);

    status = response.status; // eslint-disable-line prefer-destructuring

    if (status === 200) {
      data = await response.json();
    } else if (!upstreamStatusCodesToPropagate.includes(status)) {
      // eslint-disable-next-line no-console
      console.warn(
        `Unexpected upstream response (HTTP status code ${status}) when requesting ${url}`,
      );
      status = 502;
    }
  } catch (error) {
    logger.error(error);
    status = 502;
  }

  return {
    isAmp,
    data,
    service,
    status,
  };
};

export default getInitialData;
