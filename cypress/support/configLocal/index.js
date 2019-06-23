export default {
  baseUrl: 'http://localhost:7080',
  baseUrlNonSTLD: 'http://localhost:7080',
  assetUrl: 'http://localhost:7080',
  assetOrigin: 'http://localhost:7080',
  atiAnalyticsWSBucket: '598343',
  services: {
    // Proof we can add all services in this config file, even without coding anything.
    mundo: {
      canonical: undefined,
      errorPages: undefined,
      manifestPath: undefined,
      serviceWorkerPath: undefined,
      meta: {
        dir: undefined,
        lang: undefined,
        titleSuffix: undefined,
      },
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    news: {
      canonical: 'https://www.bbc.co.uk/news',
      errorPages: '/news/articles/cxvxrj8tvppo',
      manifestPath: '/news/articles/manifest.json',
      serviceWorkerPath: '/news/articles/sw.js',
      meta: {
        dir: 'ltr',
        lang: 'en_GB',
        titleSuffix: ' - BBC News',
      },
      pageTypes: {
        articles: {
          path: '/articles',
          basicAsset: '/news/articles/c6v11qzyv8po',
          fullyFeaturedAsset: undefined,
          nonExistent: '/news/articles/cxvxrj8tvppo',
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
      canonical: 'https://www.bbc.co.uk/news',
      errorPages: '/persian/articles/cxvxrj8tvppo',
      manifestPath: '/persian/articles/manifest.json',
      serviceWorkerPath: '/persian/articles/sw.js',
      meta: {
        dir: 'rtl',
        lang: 'fa',
        titleSuffix: ' - BBC News فارسی',
      },
      pageTypes: {
        articles: {
          path: '/articles',
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
      canonical: 'https://www.bbc.co.uk/news',
      errorPages: undefined,
      manifestPath: '/igbo/manifest.json',
      serviceWorkerPath: '/igbo/sw.js',
      meta: {
        dir: undefined,
        lang: undefined,
        titleSuffix: undefined,
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
      canonical: 'https://www.bbc.co.uk/news',
      errorPages: undefined,
      manifestPath: '/pidgin/manifest.json',
      serviceWorkerPath: '/pidgin/sw.js',
      meta: {
        dir: undefined,
        lang: undefined,
        titleSuffix: undefined,
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
      canonical: 'https://www.bbc.co.uk/news',
      errorPages: undefined,
      manifestPath: '/yoruba/manifest.json',
      serviceWorkerPath: '/yoruba/sw.js',
      meta: {
        dir: undefined,
        lang: undefined,
        titleSuffix: undefined,
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
