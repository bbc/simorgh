module.exports = {
  name: 'news',
  font: 'Reith',
  isWorldService: false,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/news/articles/cj7xrxz0e8zo'],
          enabled: true,
        },
        test: {
          paths: ['/news/articles/cn7k01xp8kxo'],
          enabled: true,
        },
        local: {
          paths: ['/news/articles/cn7k01xp8kxo'],
          enabled: true,
        },
      },
      smoke: true,
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
          paths: ['/news/articles/cxvxrj8tvppo'],
          enabled: true,
        },
      },
      smoke: true,
    },
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
          paths: ['/news/uk-56342465', '/news/technology-56294493'],
          enabled: true,
        },
        test: {
          paths: ['/news/23393110'],
          enabled: true,
        },
        local: {
          paths: ['/news/uk-56342465', '/news/technology-56294493'],
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
          paths: [
            '/news/articles/cj7xrxz0e8zo', // Article
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/news/articles/cn7k01xp8kxo', // Article
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/news/articles/cn7k01xp8kxo', // Article
          ],
          enabled: true,
        },
      },
      smoke: true,
    },
  },
};
