const config = {
  live: {
    baseUrl: 'https://simorgh.api.bbci.co.uk',
    dataUrl: 'https://www.bbc.com',
    assetUrl: 'https://news.files.bbci.co.uk/include/articles/public',
    assets: {
      news: 'cxvxrj9yvppo',
      newsThreeSubheadlines: 'cpzk9lkk2p7o',
      persian: 'c5ml5n7w4m3o',
    },
  },
  test: {
    baseUrl: 'https://simorgh.test.api.bbci.co.uk',
    dataUrl: 'https://www.test.bbc.com',
    assetUrl: 'https://news.test.files.bbci.co.uk/include/articles/public',
    assets: {
      news: 'c85pqyj5m2ko',
      newsThreeSubheadlines: 'c9rpqy7pmypo',
      persian: 'cwv2xv848j5o',
    },
  },
  local: {
    baseUrl: 'http://localhost:7080',
    dataUrl: 'http://localhost:7080',
    assetUrl: 'http://localhost:7080',
    assets: {
      news: 'c85pqyj5m2ko',
      newsThreeSubheadlines: 'c9rpqy7pmypo',
      persian: 'cwv2xv848j5o',
    },
  },
};

module.exports =
  typeof Cypress !== 'undefined'
    ? config[Cypress.env('APP_ENV')]
    : env => config[env];
