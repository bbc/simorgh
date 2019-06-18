const config = {
  live: {
    baseUrl: 'https://www.bbc.com',
    dataUrl: 'https://www.bbc.com',
    assetUrl: 'https://news.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.files.bbci.co.uk',
    assets: {
      news: 'c5ll353v7y9o',
      persian: 'c7eel0lmr4do',
    },
    specialAssets: {
      news: 'c8xxl4l3dzeo',
      nonExistent: 'cxvxrj8tvppo',
    },
    atiAnalyticsWSBucket: '598342',
  },
  test: {
    baseUrl: 'https://www.test.bbc.com',
    dataUrl: 'https://www.test.bbc.com',
    assetUrl: 'https://news.test.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.test.files.bbci.co.uk',
    assets: {
      news: 'c6v11qzyv8po',
      persian: 'c4vlle3q337o',
    },
    specialAssets: {
      news: 'c0g992jmmkko',
      nonExistent: 'cxvxrj8tvppo',
    },
    atiAnalyticsWSBucket: '598343',
  },
  local: {
    baseUrl: 'http://localhost:7080',
    dataUrl: 'http://localhost:7080',
    assetUrl: 'http://localhost:7080',
    assetOrigin: 'http://localhost:7080',
    assets: {
      news: 'c6v11qzyv8po',
      persian: 'c4vlle3q337o',
    },
    specialAssets: {
      news: 'c0g992jmmkko',
      nonExistent: 'cxvxrj8tvppo',
    },
    atiAnalyticsWSBucket: '598343',
  },
};

module.exports =
  typeof Cypress !== 'undefined'
    ? config[Cypress.env('APP_ENV')]
    : env => config[env];
