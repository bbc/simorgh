const config = {
  live: {
    baseUrl: 'https://simorgh.api.bbci.co.uk',
    dataUrl: 'https://www.bbc.com',
    assetUrl: 'https://news.files.bbci.co.uk/include/articles/public',
    assets: {
      news: 'c8xxl4l3dzeo',
      newsThreeSubheadlines: 'c5ll353v7y9o',
      persian: 'c7eel0lmr4do',
      nonExistent: 'cxvxrj8tvppo',
    },
  },
  test: {
    baseUrl: 'https://simorgh.test.api.bbci.co.uk',
    dataUrl: 'https://www.test.bbc.com',
    assetUrl: 'https://news.test.files.bbci.co.uk/include/articles/public',
    assets: {
      news: 'cn7769kpk9mo',
      newsThreeSubheadlines: 'cl55zn0w0l4o',
      persian: 'cyddjz5058wo',
      nonExistent: 'cxvxrj8tvppo',
    },
  },
  local: {
    baseUrl: 'http://localhost:7080',
    dataUrl: 'http://localhost:7080',
    assetUrl: 'http://localhost:7080',
    assets: {
      news: 'cn7769kpk9mo',
      newsThreeSubheadlines: 'cl55zn0w0l4o',
      persian: 'cyddjz5058wo',
      nonExistent: 'cxvxrj8tvppo',
    },
  },
};

module.exports =
  typeof Cypress !== 'undefined'
    ? config[Cypress.env('APP_ENV')]
    : env => config[env];
