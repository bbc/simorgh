module.exports = {
  name: 'sport',
  font: undefined,
  variant: 'default',
  pageTypes: {
    articles: { environments: undefined, smoke: false },
    errorPage404: { environments: undefined, smoke: false },
    frontPage: { environments: undefined, smoke: false },
    liveRadio: { environments: undefined, smoke: false },
    onDemandAudio: { environments: undefined, smoke: false },
    onDemandTV: { environments: undefined, smoke: false },
    topicPage: { environments: undefined, smoke: false },
    mediaAssetPage: { environments: undefined, smoke: false },
    mostWatchedPage: { environments: undefined, smoke: false },
    photoGalleryPage: { environments: undefined, smoke: false },
    storyPage: {
      environments: {
        live: {
          paths: [
            '/sport/rugby-union/56359986',
            '/sport/golf/56318994',
            '/sport/cricket/20256774',
          ],
          enabled: true,
        },
        test: {
          paths: ['/sport/formula1/23355387', '/sport/tennis/23372108'],
          enabled: true,
        },
        local: {
          paths: [
            '/sport/rugby-union/56359986',
            '/sport/golf/56318994',
            '/sport/cricket/20256774',
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostReadPage: { environments: undefined, smoke: false },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: undefined,
      smoke: false,
    },
  },
  specialFeatures: {
    cookieBanner: {
      environments: {
        live: {
          paths: [],
          enabled: false,
        },
        test: {
          paths: [],
          enabled: false,
        },
        local: {
          paths: [],
          enabled: false,
        },
      },
      smoke: false,
    },
  },
};
