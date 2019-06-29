const config = {
  live: {
    baseUrl: 'https://www.bbc.com',
    dataUrl: 'https://www.bbc.com',
    assetUrl: 'https://news.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.files.bbci.co.uk',
    // assets: {
    //   news: 'c8xxl4l3dzeo',
    //   newsThreeSubheadlines: 'c5ll353v7y9o',
    //   persian: 'c7eel0lmr4do',
    // },
    atiAnalyticsWSBucket: '598342',
  },
  test: {
    baseUrl: 'https://www.test.bbc.com',
    dataUrl: 'https://www.test.bbc.com',
    assetUrl: 'https://news.test.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.test.files.bbci.co.uk',
    // assets: {
    //   news: 'c0g992jmmkko',
    //   newsThreeSubheadlines: 'c6v11qzyv8po',
    //   persian: 'c4vlle3q337o',
    // },
    atiAnalyticsWSBucket: '598343',
  },
  local: {
    baseUrl: 'http://localhost:7080',
    dataUrl: 'http://localhost:7080',
    assetUrl: 'http://localhost:7080',
    assetOrigin: 'http://localhost:7080',
    // assets: {
    //   news: 'c0g992jmmkko',
    //   newsThreeSubheadlines: 'c6v11qzyv8po',
    //   persian: 'c4vlle3q337o',
    // },
    atiAnalyticsWSBucket: '598343',
  },
};

const geoLocate = (conf, isUk = false) => {
  if (!isUk) return conf;

  // eslint-disable-next-line no-param-reassign
  conf.baseUrl = conf.baseUrl.replace('.com', '.co.uk');
  // eslint-disable-next-line no-param-reassign
  conf.dataUrl = conf.dataUrl.replace('.com', '.co.uk');

  return conf;
};

module.exports =
  typeof Cypress !== 'undefined'
    ? geoLocate(config[Cypress.env('APP_ENV')], Cypress.env('UK'))
    : (env, uk) => geoLocate(config[env], uk);
