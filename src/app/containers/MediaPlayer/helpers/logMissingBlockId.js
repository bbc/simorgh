import nodeLogger from '#lib/logger.node';
import { MEDIA_MISSING_FIELD } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const logMissingBlockId = ({ url, assetType }) => {
  const blockIdError = 'Missing Block ID';
  const message = { url, assetType, blockIdError };
  logger.warn(MEDIA_MISSING_FIELD, message);
};

export default logMissingBlockId;
