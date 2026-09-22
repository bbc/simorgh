import SERVICES from '../services';

export default {
  _environment: 'local',
  account: {
    enabled: true,
    value: 'hindi|mundo|portuguese',
  },
  ads: {
    enabled: true,
  },
  // TODO: WS-3302 - placeholder country list pending the agreed classification.
  // Countries where ads are wanted but local entities are not trusted.
  adsNonce: {
    enabled: true,
    value: 'ng,ke',
  },
  articleLiteSiteLink: { enabled: true },
  articlePortraitVideo: {
    enabled: true,
  },
  comscoreAnalytics: {
    enabled: true,
  },
  continueReadingButton: {
    enabled: true,
  },
  electionBanner: {
    enabled: true,
  },
  enableFetchingToggles: {
    enabled: process?.env.FETCH_TOGGLES === 'true' || false,
    value: `(${SERVICES.join('|')})`,
  },
  eventTracking: {
    enabled: true,
  },
  homePageRadioSchedule: {
    enabled: true,
  },
  include: {
    enabled: true,
  },
  livePagePolling: {
    enabled: true,
  },
  liveRadioSchedule: {
    enabled: true,
  },
  locationTopicCuration: {
    enabled: true,
  },
  midArticleOnwardJourney: {
    enabled: true,
  },
  mostRead: {
    enabled: true,
  },
  nielsenAnalytics: {
    enabled: true,
  },
  onDemandRadioSchedule: {
    enabled: true,
  },
  preloadLeadImage: {
    enabled: true,
  },
  preroll: {
    enabled: true,
  },
  podcastPromo: {
    enabled: true,
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
  // TODO: WS-3302 - placeholder country list pending the agreed classification.
  // Trusted target ad markets. Every country absent from this and adsNonce gets strict CSP.
  relaxedCsp: {
    enabled: true,
    value: 'in',
  },
  scriptLink: {
    enabled: true,
  },
  sportDataPolling: {
    enabled: true,
  },
  showSportDataHeader: {
    enabled: true,
  },
  topBarOJs: {
    enabled: true,
  },
  topicUasPersonalization: {
    enabled: true,
    value: 'hindi|mundo|portuguese',
  },
  variantCookie: {
    enabled: true,
  },
  uasPersonalization: {
    enabled: true,
    value: 'hindi|mundo|portuguese',
  },
  webVitalsMonitoring: {
    enabled: true,
  },
};
