import nodeLogger from '#lib/logger.node';
import { DATA_PROCESSING_ERROR } from '#lib/logger.const';
import getErrorCode from './getErrorCode';

const logger = nodeLogger(__filename);

export default error => {
  logger.error(DATA_PROCESSING_ERROR, { error: error.toString() });

  return {
    error,
    status: getErrorCode(),
  };
};
