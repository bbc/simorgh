import nodeLogger from '#lib/logger.node';
import { MEDIA_PLAYER_STATUS } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const logEmbedSourceStatus = async ({ url, embedUrl, assetType }) => {
  const response = await fetch(embedUrl, { method: 'HEAD' });
  const { status } = response;
  const message = { url, embedUrl, status, assetType };
  if (status >= 300 || status < 200) {
    logger.warn(MEDIA_PLAYER_STATUS, message);
  } else {
    logger.info(MEDIA_PLAYER_STATUS, message);
  }
};

export default logEmbedSourceStatus;
