const toggles = {
  local: {
    ads: {
      enabled: true,
    },
    chartbeatAnalytics: {
      enabled: true,
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
    enableFetchingToggles: {
      enabled: true,
      value: '(mundo|news)',
    },
  },
  test: {
    ads: {
      fetchValue: true,
    },
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
    enableFetchingToggles: {
      enabled: true,
      value: '(mundo|news)',
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
    enableFetchingToggles: {
      enabled: false,
      value: '(mundo|news)',
    },
  },
};

export default toggles;
