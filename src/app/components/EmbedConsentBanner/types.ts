import { SocialEmbedProviders } from '../../models/types/global';

export type ConsentBannerProviders = Extract<
  SocialEmbedProviders,
  'youtube' | 'tiktok' | 'twitter' | 'facebook' | 'instagram'
>;

export const getEventTrackingData = (provider: ConsentBannerProviders) => ({
  componentName: `social-consent-banner-${provider}`,
});
