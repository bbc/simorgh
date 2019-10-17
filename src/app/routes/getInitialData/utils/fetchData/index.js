import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';
import preprocess from '#lib/utilities/preprocessor';

const logger = nodeLogger(__filename);

const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_GATEWAY = 502;
const STATUS_CODE_NOT_FOUND = 404;
const upstreamStatusCodesToPropagate = [STATUS_CODE_OK, STATUS_CODE_NOT_FOUND];

const handleResponse = preprocessorRules => async response => {
  const { status } = response;

  return {
    status,
    ...(status === STATUS_CODE_OK && {
      pageData: await preprocess(await response.json(), preprocessorRules),
    }),
  };
};

const checkForError = url => ({ status, pageData }) => {
  const isHandledStatus = upstreamStatusCodesToPropagate.includes(status);

  if (isHandledStatus) {
    return { status, pageData };
  }
  logger.warn(
    `Unexpected upstream response (HTTP status code ${status}) when requesting ${url}`,
  );
  throw new Error();
};

const handleError = error => {
  if (error.message) {
    logger.error(error.message);
  }
  return { error, status: STATUS_CODE_BAD_GATEWAY };
};

const fetchData = ({ url, preprocessorRules }) =>
  fetch(url)
    .then(handleResponse(preprocessorRules))
    .then(checkForError(url))
    .catch(handleError);

export default fetchData;
