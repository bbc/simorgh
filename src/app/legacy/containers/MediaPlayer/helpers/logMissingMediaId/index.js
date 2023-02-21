import nodeLogger from '#lib/logger.node';
import { MEDIA_MISSING_FIELD } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const logMissingMediaId = ({ url, assetType }) => {
  const missingField = 'blockId';
  const message = { url, assetType, missingField };
  logger.warn(MEDIA_MISSING_FIELD, message);
};

export default logMissingMediaId;
