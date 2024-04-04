import isNil from 'ramda/src/isNil';
import path from 'ramda/src/path';
import curry from 'ramda/src/curry';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

export const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

const getLoggingFunction = level =>
  ({
    [LOG_LEVELS.INFO]: logger.info,
    [LOG_LEVELS.WARN]: logger.warn,
    [LOG_LEVELS.ERROR]: logger.error,
  })[level] || logger.info;

const pathWithLogging =
  (url, logCategory, pageData) =>
  (fieldPath, logLevel = LOG_LEVELS.INFO) => {
    const field = path(fieldPath, pageData);
    if (isNil(field)) {
      const loggingFunction = getLoggingFunction(logLevel);
      loggingFunction(logCategory, {
        url,
        path: fieldPath,
      });
    }

    return field;
  };

export default curry(pathWithLogging);
