import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';
import preprocess from '#lib/utilities/preprocessor';

const logger = nodeLogger(__filename);
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_GATEWAY = 502;
const STATUS_CODE_NOT_FOUND = 404;
const upstreamStatusCodesToPropagate = [STATUS_CODE_OK, STATUS_CODE_NOT_FOUND];

const fetchData = async ({ url, preprocessorRules }) => {
  try {
    const response = await fetch(url);
    const { status } = response;

    if (upstreamStatusCodesToPropagate.includes(status)) {
      return {
        status,
        ...(status === STATUS_CODE_OK && {
          pageData: preprocess(await response.json(), preprocessorRules),
        }),
      };
    }

    logger.warn(
      `Unexpected upstream response (HTTP status code ${status}) when requesting ${url}`,
    );
  } catch (error) {
    logger.error(error);
    return { status: STATUS_CODE_BAD_GATEWAY, error };
  }
  return { status: STATUS_CODE_BAD_GATEWAY };
};

export default fetchData;
