export default {
  _environment: 'local',
  ads: {
    enabled: true,
  },
  adsNonce: {
    enabled: true,
  },
  articleLiteSiteLink: { enabled: true },
  comscoreAnalytics: {
    enabled: true,
  },
  electionBanner: {
    enabled: true,
  },
  enableFetchingToggles: {
    enabled: process?.env.FETCH_TOGGLES === 'true' || false,
    value:
      '(afaanoromoo|afrique|amharic|arabic|archive|azeri|bengali|burmese|cymrufyw|dari|gahuza|gujarati|hausa|hindi|igbo|indonesia|japanese|korean|kyrgyz|marathi|mundo|naidheachdan|nepali|news|pashto|persian|pidgin|polska|portuguese|punjabi|russian|scotland|serbian|sinhala|somali|swahili|tamil|telugu|thai|tigrinya|turkce|ukchina|ukrainian|urdu|uzbek|ws|vietnamese|yoruba|zhongwen)',
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
  prerollAds: {
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
  variantCookie: {
    enabled: true,
  },
  webVitalsMonitoring: {
    enabled: true,
  },
};
