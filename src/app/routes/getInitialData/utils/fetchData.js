// import 'isomorphic-fetch';
import nodeLogger from '../../../lib/logger.node';
import preprocess from '../../../lib/utilities/preprocessor';

const logger = nodeLogger(__filename);
const upstreamStatusCodesToPropagate = [200, 404];

const fetchData = async ({ url, preprocessorRules }) => {
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
