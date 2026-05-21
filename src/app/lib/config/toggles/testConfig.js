import SERVICES from '../services';

export default {
  _environment: 'test',
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
    enabled: true,
  },
  enableFetchingToggles: {
    enabled: true,
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
  liveRadioSchedule: {
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
