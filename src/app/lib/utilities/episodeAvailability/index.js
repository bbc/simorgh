import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import nodeLogger from '#lib/logger.node';
import {
  EPISODE_EXPIRED,
  EPISODE_NOT_YET_AVAILABLE,
  UNRECOGNISED_EPISODE_AVAILABILITY,
} from '#lib/logger.const';

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

// Handlers for the 4 possible availabilities
const availabilityScenarios = {
  available: {
    status: EPISODE_STATUS.EPISODE_IS_AVAILABLE,
    log: () => {},
  },
  notAvailable: {
    status: EPISODE_STATUS.EPISODE_IS_EXPIRED,
    log: params => logger.info(EPISODE_EXPIRED, params),
  },
  pending: {
    status: EPISODE_STATUS.EPISODE_IS_NOT_YET_AVAILABLE,
    log: params => logger.info(EPISODE_NOT_YET_AVAILABLE, params),
  },
  future: {
    status: EPISODE_STATUS.EPISODE_IS_NOT_YET_AVAILABLE,
    log: params => logger.info(EPISODE_NOT_YET_AVAILABLE, params),
  },

  // For when the availability value provided by ARES is missing or unrecognised
  errorFallback: {
    status: EPISODE_STATUS.EPISODE_IS_EXPIRED,
    log: params => logger.error(UNRECOGNISED_EPISODE_AVAILABILITY, params),
  },
};

const getEpisodeAvailability = pageData => {
  const availability = path(
    ['content', 'blocks', '0', 'availability'],
    pageData,
  );

  const { status, log } =
    availabilityScenarios[availability] || availabilityScenarios.errorFallback;

  log({
    url: getUrl(pageData),
    availability,
  });

  return status;
};

export default getEpisodeAvailability;
