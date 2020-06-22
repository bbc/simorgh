export const EPISODE_STATUS = {
  EPISODE_IS_AVAILABLE: 'available',
  EPISODE_IS_NOT_YET_AVAILABLE: 'not-yet-available',
  EPISODE_IS_EXPIRED: 'expired',
};

const getEpisodeAvailability = ({ availableFrom, availableUntil }) => {
  const timeNow = Date.now();

  if (!availableUntil) return EPISODE_STATUS.EPISODE_IS_EXPIRED;
  if (timeNow < availableFrom)
    return EPISODE_STATUS.EPISODE_IS_NOT_YET_AVAILABLE;

  return EPISODE_STATUS.EPISODE_IS_AVAILABLE;
};

export default getEpisodeAvailability;
