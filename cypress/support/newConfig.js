export default {
  live: {
    baseUrl: 'https://www.bbc.com',
    baseUrlNonSTLD: 'https://www.bbc.com',
    assetUrl: 'https://news.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.files.bbci.co.uk',
    atiAnalyticsWSBucket: '598342',
  },
  stage: {
    baseUrl: 'https://www.stage.bbc.com',
    baseUrlNonSTLD: 'https://www.stage.bbc.com',
    assetUrl: 'https://news.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.files.bbci.co.uk',
    atiAnalyticsWSBucket: '598342',
  },
  test: {
    baseUrl: 'https://www.test.bbc.com',
    baseUrlNonSTLD: 'https://www.test.bbc.com',
    assetUrl: 'https://news.test.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.test.files.bbci.co.uk',
    atiAnalyticsWSBucket: '598343',
  },
  local: {
    baseUrl: 'http://localhost:7080',
    baseUrlNonSTLD: 'http://localhost:7080',
    assetUrl: 'http://localhost:7080',
    assetOrigin: 'http://localhost:7080',
    atiAnalyticsWSBucket: '598343',
    services: {
      // Proof we can add all services in this config file, even without coding anything.
      mundo: {
        subDir: '/mundo',
        pageTypes: {
          articles: undefined,
          frontPage: undefined,
        },
      },
      news: {
        subDir: '/news',
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
              manifest: true,
              serviceWorker: true,
            },
          },
          frontPage: undefined,
        },
      },
      persian: {
        subDir: '/persian',
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
              manifest: true,
              serviceWorker: true,
            },
          },
          frontPage: undefined,
        },
      },
      igbo: {
        subDir: '/igbo',
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
              manifest: true,
              serviceWorker: true,
            },
          },
          article: undefined,
        },
      },
      pidgin: {
        subDir: '/pidgin',
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
              manifest: true,
              serviceWorker: true,
            },
          },
          article: undefined,
        },
      },
      yoruba: {
        subDir: '/yoruba',
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
              manifest: true,
              serviceWorker: true,
            },
          },
          article: undefined,
        },
      },
    },
  },
};
