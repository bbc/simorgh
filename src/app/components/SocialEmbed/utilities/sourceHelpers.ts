import { SocialEmbedProviders } from '#app/models/types/global';

const PROVIDERS = {
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  YOUTUBE: 'youtube',
  TIKTOK: 'tiktok',
  FACEBOOK: 'facebook',
} as const;

/**
 * Determine the name of a supported provider from a social embed source URL.
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line consistent-return
export const getProviderFromSource = (source: string): SocialEmbedProviders => {
  if (source.match(/^https:\/\/twitter\.com/)) {
    return PROVIDERS.TWITTER;
  }
  if (source.match(/^https:\/\/www\.instagram\.com/)) {
    return PROVIDERS.INSTAGRAM;
  }
  if (
    source.match(/^https:\/\/www\.youtube-nocookie\.com/) ||
    source.match(/^https:\/\/www\.youtube\.com/) ||
    source.match(/^https:\/\/youtu\.be/)
  ) {
    return PROVIDERS.YOUTUBE;
  }
  if (source.match(/^https:\/\/www\.tiktok\.com/)) {
    return PROVIDERS.TIKTOK;
  }
  if (source.match(/^https:\/\/www\.facebook\.com/)) {
    return PROVIDERS.FACEBOOK;
  }
};

/**
 * Extract the social media embed ID from a supported provider's social embed
 * source URL.
 */
export const getIdFromSource = (source: string) => {
  const sourceIds = {
    twitter: /\/status\/([0-9]+)/,
    youtube: /([0-9A-Za-z_-]+$)/,
    instagram: /\/p\/([0-9A-Za-z_-]+)/,
    tiktok: /\/video\/([0-9]+)/,
    facebook: /\/(?:posts|videos)\/([0-9A-Za-z]+)/,
  };
  const NO_ID = '';
  const provider = getProviderFromSource(source);

  if (
    provider &&
    [
      PROVIDERS.TWITTER,
      PROVIDERS.YOUTUBE,
      PROVIDERS.INSTAGRAM,
      PROVIDERS.TIKTOK,
      PROVIDERS.FACEBOOK,
    ].includes(provider)
  ) {
    const id = source.match(sourceIds[provider]);
    return id ? id[1] : NO_ID;
  }
  return NO_ID;
};
