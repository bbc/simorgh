import path from 'ramda/src/path';
import nodeLogger from '#lib/logger.node';
import { OD_RADIO_EPISODE_EXPIRED } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const getUri = pageData => {
  // Path incorrect. Needs constructing for brand and epsiode
  return path(['metadata', 'locators', 'assetUri'], pageData);
};

const logExpiredEpisode = pageData => {
  logger.info(OD_RADIO_EPISODE_EXPIRED, {
    url: getUri(pageData),
  });
};

export { logExpiredEpisode };
