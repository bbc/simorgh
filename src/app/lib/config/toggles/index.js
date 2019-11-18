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
  },
  test: {
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
  },
  live: {
    chartbeatAnalytics: {
      enabled: false,
    },
    mediaPlayer: {
      enabled: false,
    },
    mpulse: {
      enabled: true,
    },
    navOnArticles: {
      enabled: false,
    },
  },
};

export default toggles;
