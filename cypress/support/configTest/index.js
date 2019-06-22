export default {
  baseUrl: 'https://www.test.bbc.com',
  baseUrlNonSTLD: 'https://www.test.bbc.com',
  assetUrl: 'https://news.test.files.bbci.co.uk/include/articles/public',
  assetOrigin: 'https://news.test.files.bbci.co.uk',
  atiAnalyticsWSBucket: '598343',
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
          basicAsset: '/c0g992jmmkko',
          fullyFeaturedAsset: undefined,
          nonExistent: '/cxvxrj8tvppo',
          // Special case
          threeSubheadlines: '/c6v11qzyv8po',
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
        articles: {
          path: '/articles',
          basicAsset: '/c4vlle3q337o',
          fullyFeaturedAsset: undefined,
          nonExistent: '/cxvxrj8tvppo',
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
    igbo: {
      subDir: '/igbo',
      errorPages: undefined,
      manifestPath: '/igbo/manifest.json',
      serviceWorkerPath: '/igbo/sw.js',
      pageTypes: {
        articles: undefined,
        frontPage: {
          featureFlags: {
            amp: false,
            atiAnalytics: false,
            cookieTests: true,
            dataEndpoint: false,
            header: false,
            footer: false,
            meta: false,
          },
        },
      },
    },
    pidgin: {
      subDir: '/pidgin',
      errorPages: undefined,
      manifestPath: '/pidgin/manifest.json',
      serviceWorkerPath: '/pidgin/sw.js',
      pageTypes: {
        articles: undefined,
        frontPage: {
          featureFlags: {
            amp: false,
            atiAnalytics: false,
            cookieTests: true,
            dataEndpoint: false,
            header: false,
            footer: false,
            meta: false,
          },
        },
      },
    },
    yoruba: {
      subDir: '/yoruba',
      errorPages: undefined,
      manifestPath: '/yoruba/manifest.json',
      serviceWorkerPath: '/yoruba/sw.js',
      pageTypes: {
        articles: undefined,
        frontPage: {
          featureFlags: {
            amp: false,
            atiAnalytics: false,
            cookieTests: true,
            dataEndpoint: false,
            header: false,
            footer: false,
            meta: false,
          },
        },
      },
    },
  },
};
