import isNil from 'ramda/src/isNil';
import path from 'ramda/src/path';
import { RADIO_MISSING_FIELD } from '#lib/logger.const';
import { getUri } from '../logInitialData';
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
  }[level] || logger.info);

export default (fieldPath, { logLevel = LOG_LEVELS.INFO } = {}) => pageData => {
  const field = path(fieldPath, pageData);
  if (isNil(field)) {
    const loggingFunction = getLoggingFunction(logLevel);
    loggingFunction(RADIO_MISSING_FIELD, {
      url: getUri(pageData),
      path: fieldPath,
    });
  }

  return field;
};
