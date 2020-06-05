import path from 'ramda/src/path';
import nodeLogger from '#lib/logger.node';
import { RADIO_EPISODE_EXPIRED } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const getUri = pageData => {
  const masterBrand = path(['metadata', 'createdBy'], pageData);
  const pid = path(['metadata', 'locators', 'pid'], pageData);

  // Path incorrect. Needs constructing for brand and epsiode
  return path(['metadata', 'locators', 'assetUri'], pageData);
};

const logExpiredEpisode = pageData => {
  logger.info(RADIO_EPISODE_EXPIRED, {
    url: getUri(pageData),
  });
};

// const pathWithValidation = pageData => {

// }

export { logExpiredEpisode };
