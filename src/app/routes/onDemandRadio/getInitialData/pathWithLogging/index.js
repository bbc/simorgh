import isNil from 'ramda/src/isNil';
import path from 'ramda/src/path';
import { MEDIA_MISSING_FIELD } from '#lib/logger.const';
import { getUri } from '../logInitialData';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

export const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

const getLogger = level =>
  ({
    [LOG_LEVELS.INFO]: logger.info,
    [LOG_LEVELS.WARN]: logger.warn,
    [LOG_LEVELS.ERROR]: logger.error,
  }[level] || logger.info);

export default (fieldPath, { logLevel = LOG_LEVELS.INFO } = {}) => pageData => {
  const value = path(fieldPath, pageData);
  if (isNil(value)) {
    getLogger(logLevel)(MEDIA_MISSING_FIELD, {
      url: getUri(pageData),
      fieldPath,
    });
  }

  return value;
};
