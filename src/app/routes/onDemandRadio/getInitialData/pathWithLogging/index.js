import isNil from 'ramda/src/isNil';
import path from 'ramda/src/path';
import { MEDIA_MISSING_FIELD } from '#lib/logger.const';
import { getUri } from '../logInitialData';

const nodeLogger = require('#lib/logger.node');

const logger = nodeLogger(__filename);

export const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

const loggers = {
  [LOG_LEVELS.INFO]: logger.info,
  [LOG_LEVELS.WARN]: logger.warn,
  [LOG_LEVELS.ERROR]: logger.error,
};

export default (fieldPath, { logLevel = LOG_LEVELS.INFO } = {}) => pageData => {
  const value = path(fieldPath, pageData);
  if (isNil(value)) {
    loggers[logLevel](MEDIA_MISSING_FIELD, {
      url: getUri(pageData),
      fieldPath,
    });
  }

  return value;
};
