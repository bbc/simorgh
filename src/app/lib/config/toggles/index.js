const toggles = {
  test: {
    mpulse: {
      enabled: false,
    },
    mediaPlayer: {
      enabled: true,
    },
    chartbeatAnalytics: {
      enabled: false,
    },
  },
  live: {
    mpulse: {
      enabled: false,
    },
    mediaPlayer: {
      enabled: false,
    },
    chartbeatAnalytics: {
      enabled: false,
    },
  },
  local: {
    mpulse: {
      enabled: false,
    },
    audioVideo: {
      enabled: true,
    },
    chartbeatAnalytics: {
      enabled: true,
    },
  },
};

export default toggles;
