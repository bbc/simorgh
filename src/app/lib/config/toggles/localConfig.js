import { services } from '../services/loadableConfig';

export default {
  _environment: 'local',
  ads: {
    enabled: true,
  },
  adsNonce: {
    enabled: false,
  },
  articleLiteSiteLink: { enabled: true },
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
    value: `(${services.join('|')})`,
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
