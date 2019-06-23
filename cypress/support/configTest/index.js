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
      attributes: {
        lang: undefined,
        dir: undefined,
      },
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
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: {
          path: '/articles',
          basicAsset: '/news/articles/c0g992jmmkko',
          fullyFeaturedAsset: undefined,
          nonExistent: '/news/articles/cxvxrj8tvppo',
          // Special case
          threeSubheadlines: '/news/articles/c6v11qzyv8po',
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
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: {
          path: '/persian/articles/articles',
          basicAsset: '/persian/articles/c4vlle3q337o',
          fullyFeaturedAsset: undefined,
          nonExistent: '/persian/articles/cxvxrj8tvppo',
          featureFlags: {
            amp: true,
            atiAnalytics: true,
            cookieTests: true,
            dataEndpoint: true,
            header: true,
            footer: false,
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
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: undefined,
        frontPage: {
          path: '/igbo',
          featureFlags: {
            amp: false,
            atiAnalytics: false,
            cookieTests: true,
            dataEndpoint: true,
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
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: undefined,
        frontPage: {
          path: '/pidgin',
          featureFlags: {
            amp: false,
            atiAnalytics: false,
            cookieTests: true,
            dataEndpoint: true,
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
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: undefined,
        frontPage: {
          path: '/yoruba',
          featureFlags: {
            amp: false,
            atiAnalytics: false,
            cookieTests: true,
            dataEndpoint: true,
            header: false,
            footer: false,
            meta: false,
          },
        },
      },
    },
  },
};
