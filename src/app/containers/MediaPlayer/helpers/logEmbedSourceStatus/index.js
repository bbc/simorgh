import nodeLogger from '#lib/logger.node';
import { MEDIA_PLAYER_RESPONSE } from '#lib/logger.const';

const logger = nodeLogger(__filename);

async function logEmbedSourceStatus(embedSource) {
  const response = await fetch(embedSource, { method: 'HEAD' });
  const { status } = response;
  const data = {
    url: embedSource,
    status,
  };
  if (status >= 200 && status < 300) {
    logger.info(MEDIA_PLAYER_RESPONSE, data);
  }
  if (status >= 400 && status < 600) {
    logger.warn(MEDIA_PLAYER_RESPONSE, data);
  }
}

export default logEmbedSourceStatus;
