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
  if (status >= 300 || status < 200) {
    logger.warn(MEDIA_PLAYER_RESPONSE, data);
  } else {
    logger.info(MEDIA_PLAYER_RESPONSE, data);
  }
}

export default logEmbedSourceStatus;
