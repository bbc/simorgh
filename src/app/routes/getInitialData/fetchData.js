import 'isomorphic-fetch';
import nodeLogger from '../../helpers/logger.node';
import preprocess from '../../dataValidator/preprocessor';

const logger = nodeLogger(__filename);
const upstreamStatusCodesToPropagate = [200, 404];

const fetchData = async ({ url, preprocessorRules }) => {
  let data;
  let status;

  try {
    const response = await fetch(url);

    status = response.status; // eslint-disable-line prefer-destructuring

    if (status === 200) {
      data = await response.json();
      data = preprocess(data, preprocessorRules);
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

  return { data, status };
};

export default fetchData;
