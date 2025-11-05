import { services } from '../services/loadableConfig';

export default {
  _environment: 'live',
  ads: {
    enabled: false,
  },
  adsNonce: {
    enabled: false,
  },
  articleLiteSiteLink: { enabled: true },
  comscoreAnalytics: {
    enabled: true,
  },
  electionBanner: {
    enabled: false,
  },
  enableFetchingToggles: {
    enabled: true,
    value: `(${services.join('|')})`,
  },
  eventTracking: {
    enabled: true,
  },
  homePageRadioSchedule: {
    enabled: false,
  },
  include: {
    enabled: true,
  },
  liveRadioSchedule: {
    enabled: false,
  },
  midArticleOnwardJourney: {
    enabled: false,
  },
  mostRead: {
    enabled: false,
  },
  nielsenAnalytics: {
    enabled: true,
  },
  onDemandRadioSchedule: {
    enabled: false,
  },
  preloadLeadImage: {
    enabled: true,
  },
  prerollAds: {
    enabled: true,
  },
  podcastPromo: {
    enabled: false,
  },
  recentAudioEpisodes: {
    enabled: true,
    value: 4,
  },
  recentPodcastEpisodes: {
    enabled: true,
    value: 8,
  },
  recentVideoEpisodes: {
    enabled: true,
    value: 4,
  },
  scriptLink: {
    enabled: true,
  },
  topBarOJs: {
    enabled: true,
  },
  variantCookie: {
    enabled: true,
  },
  webVitalsMonitoring: {
    enabled: true,
  },
};
