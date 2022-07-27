const PROVIDERS = {
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  YOUTUBE: 'youtube',
  UNKNOWN: 'unknown',
};

/**
 * Determine the name of a supported provider from a social embed source URL.
 * @param {string} source The source URL of a social embed.
 * @returns {string}
 */
export const getProviderFromSource = source => {
  if (source.match(/^https:\/\/twitter\.com/)) {
    return PROVIDERS.TWITTER;
  }
  if (source.match(/^https:\/\/www\.instagram\.com/)) {
    return PROVIDERS.INSTAGRAM;
  }
  if (
    source.match(/^https:\/\/www\.youtube-nocookie\.com/) ||
    source.match(/^https:\/\/www\.youtube\.com/)
  ) {
    return PROVIDERS.YOUTUBE;
  }
  return PROVIDERS.UNKNOWN;
};

/**
 * Extract the social media embed ID from a supported provider's social embed
 * source URL.
 * @param {string} source The source URL of a social embed.
 * @returns {string}
 */
export const getIdFromSource = source => {
  const NO_ID = '';
  const provider = getProviderFromSource(source);
  if (
    provider === PROVIDERS.TWITTER ||
    provider === PROVIDERS.YOUTUBE ||
    provider === PROVIDERS.INSTAGRAM
  ) {
    const twitterId = source.match(/\/status\/([0-9]+)/);
    const youtubeId = source.match(/\/watch\?v=([0-9 A-Z a-z _-]+)/);
    const instagramId = source.match(/\/p\/([0-9 A-Z a-z]+)/);
    const Id = twitterId || instagramId || youtubeId;
    return Id ? Id[1] : NO_ID;
  }
  return NO_ID;
};
