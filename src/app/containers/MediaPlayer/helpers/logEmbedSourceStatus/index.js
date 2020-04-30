import nodeLogger from '#lib/logger.node';
import { MEDIA_PLAYER_RESPONSE } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const logEmbedSourceStatus = async ({ url, assetType }) => {
  const response = await fetch(url, { method: 'HEAD' });
  const { status } = response;
  const message = { url, status, assetType };
  if (status >= 300 || status < 200) {
    logger.warn(MEDIA_PLAYER_RESPONSE, message);
  } else {
    logger.info(MEDIA_PLAYER_RESPONSE, message);
  }
};

export default logEmbedSourceStatus;
