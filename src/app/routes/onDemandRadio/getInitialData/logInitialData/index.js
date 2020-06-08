import path from 'ramda/src/path';
import nodeLogger from '#lib/logger.node';
import { RADIO_EPISODE_EXPIRED } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const parsePageIdentifier = pageIdentifier => {
  const pathParts = pageIdentifier.split('.');
  const uri = pathParts.join('/').replace('/page', '');
  return uri;
};

const getUri = pageJson => {
  const pageIdentifier = path(
    ['metadata', 'analyticsLabels', 'pageIdentifier'],
    pageJson,
  );
  const pageUri = parsePageIdentifier(pageIdentifier);
  return pageUri;
};

const logExpiredEpisode = pageJson => {
  logger.info(RADIO_EPISODE_EXPIRED, {
    url: getUri(pageJson),
  });
};

export { logExpiredEpisode, parsePageIdentifier, getUri };
