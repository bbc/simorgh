import nodeLogger from '#lib/logger.node';
import { MEDIA_MISSING_FIELD } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const logMissingMediaId = ({ url, assetType }) => {
  const blockIdError = 'Missing Version or Block ID';
  const message = { url, assetType, blockIdError };
  logger.warn(MEDIA_MISSING_FIELD, message);
};

export default logMissingMediaId;
