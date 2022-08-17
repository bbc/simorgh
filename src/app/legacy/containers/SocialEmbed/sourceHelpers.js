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
  const sourceIds = {
    twitter: /\/status\/([0-9]+)/,
    youtube: /\/watch\?v=([0-9 A-Z a-z _-]+)/,
    instagram: /\/p\/([0-9 A-Z a-z]+)/,
  };
  const NO_ID = '';
  const provider = getProviderFromSource(source);
  if (
    [PROVIDERS.TWITTER, PROVIDERS.YOUTUBE, PROVIDERS.INSTAGRAM].includes(
      provider,
    )
  ) {
    const id = source.match(sourceIds[provider]);
    return id ? id[1] : NO_ID;
  }
  return NO_ID;
};
