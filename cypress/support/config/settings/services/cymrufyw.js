module.exports = {
  name: 'cymrufyw',
  font: 'Reith',
  isWorldService: false,
  variant: 'default',
  pageTypes: {
    articles: {
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
          paths: ['/cymrufyw/erthyglau/c06p32z9x2mo'],
          enabled: false,
        },
      },
      smoke: false,
    },
    errorPage404: {
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
          paths: ['/cymrufyw/erthyglau/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: { environments: undefined, smoke: false },
    liveRadio: { environments: undefined, smoke: false },
    onDemandAudio: { environments: undefined, smoke: false },
    onDemandTV: { environments: undefined, smoke: false },
    mediaAssetPage: { environments: undefined, smoke: false },
    mostWatchedPage: { environments: undefined, smoke: false },
    photoGalleryPage: { environments: undefined, smoke: false },
    storyPage: { environments: undefined, smoke: false },
    topicPage: { environments: undefined, smoke: false },
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
