const PROVIDERS = {
  TWITTER: 'twitter',
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
  if (provider === PROVIDERS.TWITTER) {
    const match = source.match(/\/status\/([0-9]+)/);
    return match ? match[1] : NO_ID;
  }
  return NO_ID;
};
