import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import nodeLogger from '#lib/logger.node';
import { EPISODE_EXPIRED, EPISODE_NOT_YET_AVAILABLE } from '#lib/logger.const';

const logger = nodeLogger(__filename);

export const EPISODE_STATUS = {
  EPISODE_IS_AVAILABLE: 'available',
  EPISODE_IS_NOT_YET_AVAILABLE: 'not-yet-available',
  EPISODE_IS_EXPIRED: 'expired',
};

export const getUrl = pageData =>
  pathOr('Unknown', ['metadata', 'analyticsLabels', 'pageIdentifier'], pageData)
    .replace('.page', '')
    .replace(/\./g, '/');

const getEpisodeAvailability = pageData => {
  const timeNow = Date.now();

  const getEpisodeAvailableFrom = path([
    'content',
    'blocks',
    '0',
    'versions',
    '0',
    'availableFrom',
  ]);

  const availableFrom = getEpisodeAvailableFrom(pageData);

  if (!availableFrom) {
    logger.info(EPISODE_EXPIRED, {
      url: getUrl(pageData),
    });
    return EPISODE_STATUS.EPISODE_IS_EXPIRED;
  }
  if (timeNow < availableFrom) {
    logger.info(EPISODE_NOT_YET_AVAILABLE, {
      url: getUrl(pageData),
    });
    return EPISODE_STATUS.EPISODE_IS_NOT_YET_AVAILABLE;
  }

  return EPISODE_STATUS.EPISODE_IS_AVAILABLE;
};

export default getEpisodeAvailability;
