import pathOr from 'ramda/src/pathOr';
import nodeLogger from '#lib/logger.node';
import {
  RADIO_EPISODE_EXPIRED,
  RADIO_EPISODE_NOT_YET_AVAILABLE,
  TV_EPISODE_EXPIRED,
  TV_EPISODE_NOT_YET_AVAILABLE,
} from '#lib/logger.const';

const logger = nodeLogger(__filename);

export const EPISODE_STATUS = {
  EPISODE_IS_AVAILABLE: 'available',
  EPISODE_IS_NOT_YET_AVAILABLE: 'not-yet-available',
  EPISODE_IS_EXPIRED: 'expired',
};

const getUrl = pageData =>
  pathOr('Unknown', ['metadata', 'analyticsLabels', 'pageIdentifier'], pageData)
    .replace('.page', '')
    .replace(/\./g, '/');

const pageType = pageData => pathOr('Unknown', ['metadata', 'type'], pageData);
// Do we need a catch here?

const getEpisodeAvailability = ({
  availableFrom,
  availableUntil,
  pageData,
}) => {
  const timeNow = Date.now();

  if (!availableUntil) {
    logger.info(
      pageType === 'WSRADIO' ? RADIO_EPISODE_EXPIRED : TV_EPISODE_EXPIRED,
      // Do we need a third generic episode here if the metadata is missing?
      {
        url: getUrl(pageData),
      },
    );
    return EPISODE_STATUS.EPISODE_IS_EXPIRED;
  }
  if (timeNow < availableFrom) {
    logger.info(
      pageType === 'WSRADIO'
        ? RADIO_EPISODE_NOT_YET_AVAILABLE
        : TV_EPISODE_NOT_YET_AVAILABLE,
      {
        url: getUrl(pageData),
      },
    );
    return EPISODE_STATUS.EPISODE_IS_NOT_YET_AVAILABLE;
  }

  return EPISODE_STATUS.EPISODE_IS_AVAILABLE;
};

export default getEpisodeAvailability;
