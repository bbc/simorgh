export default {
  baseUrl: 'https://www.stage.bbc.com',
  baseUrlNonSTLD: 'https://www.stage.bbc.com',
  assetUrl: 'https://news.files.bbci.co.uk/include/articles/public',
  assetOrigin: 'https://news.files.bbci.co.uk',
  atiAnalyticsWSBucket: '598342',
  services: {
    // Proof we can add all services in this config file, even without coding anything.
    mundo: {
      subDir: '/mundo',
      errorPages: undefined,
      manifestPath: undefined,
      serviceWorkerPath: undefined,
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    news: {
      subDir: '/news',
      errorPages: '/news/articles/cxvxrj8tvppo',
      manifestPath: '/news/articles/manifest.json',
      serviceWorkerPath: '/news/articles/sw.js',
      pageTypes: {
        articles: {
          path: '/articles',
          basicAsset: '/c8xxl4l3dzeo',
          fullyFeaturedAsset: undefined,
          nonExistent: '/cxvxrj8tvppo',
          // Special case
          threeSubheadlines: '/c5ll353v7y9o',
          featureFlags: {
            amp: true,
            atiAnalytics: true,
            cookieTests: true,
            dataEndpoint: true,
            header: true,
            footer: true,
            meta: true,
          },
        },
        frontPage: undefined,
      },
    },
    persian: {
      subDir: '/persian',
      errorPages: undefined,
      manifestPath: '/persian/articles/manifest.json',
      serviceWorkerPath: '/persian/articles/sw.js',
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    igbo: {
      subDir: '/igbo',
      errorPages: undefined,
      manifestPath: '/igbo/manifest.json',
      serviceWorkerPath: '/igbo/sw.js',
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    pidgin: {
      subDir: '/pidgin',
      errorPages: undefined,
      manifestPath: '/pidgin/manifest.json',
      serviceWorkerPath: '/pidgin/sw.js',
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    yoruba: {
      subDir: '/yoruba',
      errorPages: undefined,
      manifestPath: '/yoruba/manifest.json',
      serviceWorkerPath: '/yoruba/sw.js',
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
  },
};
