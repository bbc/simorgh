const PROVIDERS = {
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  YOUTUBE: 'youtube',
  TIKTOK: 'tiktok',
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
  if (source.match(/^https:\/\/www\.tiktok\.com/)) {
    return PROVIDERS.TIKTOK;
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
    youtube: /\/watch\?v=([0-9A-Z a-z_-]+)/,
    instagram: /\/p\/([0-9A-Za-z_-]+)/,
    tiktok: /\/video\/([0-9]+)/,
  };
  const NO_ID = '';
  const provider = getProviderFromSource(source);
  if (
    [
      PROVIDERS.TWITTER,
      PROVIDERS.YOUTUBE,
      PROVIDERS.INSTAGRAM,
      PROVIDERS.TIKTOK,
    ].includes(provider)
  ) {
    const id = source.match(sourceIds[provider]);
    return id ? id[1] : NO_ID;
  }
  return NO_ID;
};
