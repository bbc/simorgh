import 'isomorphic-fetch';
import nodeLogger from '../../helpers/logger.node';
import getBaseUrl from './getBaseUrl';
import preprocess from '../../../../data/preprocessor';

const logger = nodeLogger(__filename);

const upstreamStatusCodesToPropagate = [200, 404];

const getInitialData = async ({ match }) => {
  const { id, service, amp } = match.params;
  const isAmp = !!amp;
  let data;
  let status;
  let baseUrl = process.env.SIMORGH_BASE_URL;

  if (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.origin
  ) {
    baseUrl = getBaseUrl(window.location.origin);
  }

  const url = `${baseUrl}/${service}/articles/${id}.json`;

  try {
    const response = await fetch(url);

    status = response.status; // eslint-disable-line prefer-destructuring

    if (status === 200) {
      data = await response.json();
      data = preprocess(data);
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

  return {
    isAmp,
    data,
    service,
    status,
  };
};

export default getInitialData;
