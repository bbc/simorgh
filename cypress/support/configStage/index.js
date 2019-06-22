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
      manifestPath: undefined,
      serviceWorkerPath: undefined,
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    news: {
      subDir: '/news',
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
      manifestPath: '/persian/articles/manifest.json',
      serviceWorkerPath: '/persian/articles/sw.js',
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    igbo: {
      subDir: '/igbo',
      manifestPath: '/igbo/manifest.json',
      serviceWorkerPath: '/igbo/sw.js',
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    pidgin: {
      subDir: '/pidgin',
      manifestPath: '/pidgin/manifest.json',
      serviceWorkerPath: '/pidgin/sw.js',
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    yoruba: {
      subDir: '/yoruba',
      manifestPath: '/yoruba/manifest.json',
      serviceWorkerPath: '/yoruba/sw.js',
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
  },
};
