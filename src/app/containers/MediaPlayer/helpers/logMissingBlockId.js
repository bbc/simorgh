import nodeLogger from '#lib/logger.node';
import { MEDIA_PLAYER_STATUS } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const logMissingBlockId = ({ url, assetType }) => {
  const blockIdError = 'Missing Block ID';
  const message = { url, assetType, blockIdError };
  logger.warn(MEDIA_PLAYER_STATUS, message);
};

export default logMissingBlockId;
