import path from 'ramda/src/path';
import nodeLogger from '#lib/logger.node';
import { RADIO_EPISODE_EXPIRED } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const parsePageIdentifier = pageIdentifier => {
  const pathParts = pageIdentifier.split('.');
  pathParts.pop();
  const uri = pathParts.join('/');
  return uri;
};

const getUri = pageData => {
  const pageIdentifier = path(
    ['metadata', 'analyticsLabels', 'pageIdentifier'],
    pageData,
  );
  const pageUri = parsePageIdentifier(pageIdentifier);
  return pageUri;
};

const logExpiredEpisode = pageData => {
  logger.info(RADIO_EPISODE_EXPIRED, {
    url: getUri(pageData),
  });
};

// const pathWithValidation = pageData => {
// }

export default logExpiredEpisode;
