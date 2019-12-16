const toggles = {
  local: {
    chartbeatAnalytics: {
      enabled: false,
    },
    mediaPlayer: {
      enabled: true,
    },
    mpulse: {
      enabled: false,
    },
    navOnArticles: {
      enabled: true,
    },
    mostRead: {
      enabled: false,
    },
    ampAds: {
      enabled: true,
    },
  },
  test: {
    chartbeatAnalytics: {
      enabled: true,
    },
    mediaPlayer: {
      enabled: true,
    },
    mpulse: {
      enabled: true,
    },
    navOnArticles: {
      enabled: true,
    },
    mostRead: {
      enabled: false,
    },
    ampAds: {
      enabled: true,
    },
  },
  stage: {
    chartbeatAnalytics: {
      enabled: false,
    },
    mediaPlayer: {
      enabled: true,
    },
    mpulse: {
      enabled: true,
    },
    navOnArticles: {
      enabled: true,
    },
    mostRead: {
      enabled: false,
    },
    ampAds: {
      enabled: true,
    },
  },
  live: {
    chartbeatAnalytics: {
      enabled: true,
    },
    mediaPlayer: {
      enabled: true,
    },
    mpulse: {
      enabled: true,
    },
    navOnArticles: {
      enabled: false,
    },
    mostRead: {
      enabled: false,
    },
    ampAds: {
      enabled: false,
    },
  },
};

export default toggles;
