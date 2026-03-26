import SERVICES from '../services';

export default {
  _environment: 'live',
  account: {
    enabled: false,
  },
  ads: {
    enabled: false,
  },
  adsNonce: {
    enabled: false,
  },
  articleLiteSiteLink: { enabled: true },
  articlePortraitVideo: {
    enabled: true,
  },
  comscoreAnalytics: {
    enabled: true,
  },
  continueReadingButton: {
    enabled: false,
  },
  electionBanner: {
    enabled: false,
  },
  enableFetchingToggles: {
    enabled: true,
    value: `(${SERVICES.join('|')})`,
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
  preroll: {
    enabled: true,
  },
  podcastEpisodeLinkedData: {
    enabled: false,
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
  uasPersonalization: {
    enabled: false,
  },
  webVitalsMonitoring: {
    enabled: true,
  },
};
