const PROVIDERS = {
  TWITTER: 'twitter',
  UNKNOWN: 'unknown',
};

/**
 * Determine the name of a supported provider from a social embed source URL.
 * @param {string} source The source URL of a social embed.
 * @returns {string} Provider name.
 */
export const getProviderFromSource = source => {
  if (source.match(/^https:\/\/twitter\.com/)) {
    return PROVIDERS.TWITTER;
  }
  return PROVIDERS.UNKNOWN;
};

/**
 * Extract the social media embed ID from a supported provider's social embed
 * source URL.
 * @param {string} source The source URL of a social embed.
 * @returns {string} Social embed ID.
 */
export const getIdFromSource = source => {
  const provider = getProviderFromSource(source);
  if (provider === PROVIDERS.TWITTER) {
    return source.match(/\/status\/([0-9]+)/)[1];
  }
  return '';
};
