const config = {
  live: {
    baseUrl: 'https://www.bbc.com',
    dataUrl: 'https://www.bbc.com',
    assetUrl: 'https://news.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.files.bbci.co.uk',
    atiUrl: 'https://a1.api.bbc.co.uk/hit.xiti?',
    chartbeatEnabled: false,
    avEmbedBaseUrl: 'https://polling.bbc.co.uk',
    standaloneErrorPages: false,
    alwaysCheckForFallback: true,
  },
  test: {
    baseUrl: 'https://www.test.bbc.com',
    dataUrl: 'https://www.test.bbc.com',
    assetUrl: 'https://news.test.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.test.files.bbci.co.uk',
    atiUrl: 'https://logws1363.ati-host.net?',
    chartbeatEnabled: true,
    avEmbedBaseUrl: 'https://polling.test.bbc.co.uk',
    standaloneErrorPages: false,
    alwaysCheckForFallback: true,
  },
  stage: {
    baseUrl: 'https://www.stage.bbc.com',
    dataUrl: 'https://www.stage.bbc.com',
    assetUrl: 'https://news.test.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.test.files.bbci.co.uk',
    atiUrl: 'https://logws1363.ati-host.net?',
    chartbeatEnabled: true,
    avEmbedBaseUrl: 'https://polling.bbc.co.uk',
    standaloneErrorPages: false,
    alwaysCheckForFallback: true,
  },
  local: {
    baseUrl: 'http://localhost',
    dataUrl: 'http://localhost',
    assetUrl: 'http://localhost',
    assetOrigin: 'http://localhost',
    atiUrl: 'https://logws1363.ati-host.net?',
    chartbeatEnabled: false,
    avEmbedBaseUrl: 'https://polling.test.bbc.co.uk',
    standaloneErrorPages: true,
    alwaysCheckForFallback: false,
  },
  heroku: {
    baseUrl: `${process.env.PROTOCOL || 'http'}://${process.env.HOST_URL ||
      'localhost'}.com`,
    dataUrl: `${process.env.PROTOCOL || 'http'}://${process.env.HOST_URL ||
      'localhost'}.com`,
    assetUrl: `${process.env.PROTOCOL || 'http'}://${process.env.HOST_URL ||
      'localhost'}.com`,
    assetOrigin: `${process.env.PROTOCOL || 'http'}://${process.env.HOST_URL ||
      'localhost'}.com`,
    atiUrl: 'https://logws1363.ati-host.net?',
    chartbeatEnabled: false,
    avEmbedBaseUrl: 'https://polling.test.bbc.co.uk',
    standaloneErrorPages: true,
    alwaysCheckForFallback: false,
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
