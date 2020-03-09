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
      enabled: true,
    },
    radioSchedule: {
      enabled: true,
    },
    include: {
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
      enabled: true,
    },
    radioSchedule: {
      enabled: false,
    },
    include: {
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
      enabled: true,
    },
    radioSchedule: {
      enabled: false,
    },
    include: {
      enabled: false,
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
      enabled: true,
    },
    mostRead: {
      enabled: true,
    },
    radioSchedule: {
      enabled: false,
    },
    include: {
      enabled: false,
    },
  },
};

export default toggles;
