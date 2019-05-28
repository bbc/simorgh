const config = {
  live: {
    baseUrl: 'https://www.bbc.com',
    dataUrl: 'https://www.bbc.com',
    assetUrl: 'https://news.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.files.bbci.co.uk',
    assets: {
      news: 'c8xxl4l3dzeo',
      newsThreeSubheadlines: 'c5ll353v7y9o',
      persian: 'c7eel0lmr4do',
      nonExistent: 'cxvxrj8tvppo',
    },
  },
  test: {
    baseUrl: 'https://www.test.bbc.com',
    dataUrl: 'https://www.test.bbc.com',
    assetUrl: 'https://news.test.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.test.files.bbci.co.uk',
    assets: {
      news: 'c0g992jmmkko',
      newsThreeSubheadlines: 'c6v11qzyv8po',
      persian: 'c4vlle3q337o',
      nonExistent: 'cxvxrj8tvppo',
    },
  },
  local: {
    baseUrl: 'http://localhost:7080',
    dataUrl: 'http://localhost:7080',
    assetUrl: 'http://localhost:7080',
    assetOrigin: 'http://localhost:7080',
    assets: {
      news: 'c0g992jmmkko',
      newsThreeSubheadlines: 'c6v11qzyv8po',
      persian: 'c4vlle3q337o',
      nonExistent: 'cxvxrj8tvppo',
    },
  },
};

module.exports =
  typeof Cypress !== 'undefined'
    ? config[Cypress.env('APP_ENV')]
    : env => config[env];
