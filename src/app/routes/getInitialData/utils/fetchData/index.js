import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';
import preprocess from '#lib/utilities/preprocessor';

const logger = nodeLogger(__filename);
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_GATEWAY = 502;
const STATUS_CODE_NOT_FOUND = 404;
const upstreamStatusCodesToPropagate = [STATUS_CODE_OK, STATUS_CODE_NOT_FOUND];

const handleSuccess = (url, preprocessorRules) => async response => {
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

  return { status: STATUS_CODE_BAD_GATEWAY };
};

const handleError = error => {
  logger.error(error);

  return { error, status: STATUS_CODE_BAD_GATEWAY };
};

const fetchData = ({ url, preprocessorRules }) =>
  fetch(url)
    .then(handleSuccess(url, preprocessorRules))
    .catch(handleError);

export default fetchData;
