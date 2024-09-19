const config = {
  live: {
    baseUrl: 'https://www.bbc.com',
    dataUrl: 'https://www.bbc.com',
    assetUrl: 'https://static.files.bbci.co.uk/ws/simorgh-assets/public',
    assetOrigin: 'https://news.files.bbci.co.uk',
    atiUrl: 'https://a1.api.bbc.co.uk/hit.xiti?',
    chartbeatEnabled: false,
    avEmbedBaseUrlCanonical: '',
    avEmbedBaseUrlAmp: 'https://web-cdn.api.bbci.co.uk',
    standaloneErrorPages: false,
    alwaysCheckForFallback: true,
    togglesUrl: 'https://config.api.bbci.co.uk/',
    bffUrl: 'https://web-cdn.api.bbci.co.uk/fd/simorgh-bff',
  },
  test: {
    baseUrl: 'https://www.test.bbc.com',
    dataUrl: 'https://www.test.bbc.com',
    assetUrl: 'https://static.test.files.bbci.co.uk/ws/simorgh-assets/public',
    assetOrigin: 'https://news.test.files.bbci.co.uk',
    atiUrl: 'https://logws1363.ati-host.net?',
    chartbeatEnabled: true,
    avEmbedBaseUrlCanonical: '',
    avEmbedBaseUrlAmp: 'https://web-cdn.test.api.bbci.co.uk',
    standaloneErrorPages: false,
    alwaysCheckForFallback: true,
    togglesUrl: 'https://config.test.api.bbci.co.uk/',
    bffUrl: 'https://web-cdn.api.bbci.co.uk/fd/simorgh-bff',
  },
  local: {
    baseUrl: 'http://localhost.bbc.com:7080',
    dataUrl: 'http://localhost:7080',
    assetUrl: 'http://localhost:7080',
    assetOrigin: 'http://localhost:7080',
    atiUrl: 'https://logws1363.ati-host.net?',
    chartbeatEnabled: true,
    avEmbedBaseUrlCanonical: 'https://www.test.bbc.com',
    avEmbedBaseUrlAmp: 'https://web-cdn.test.api.bbci.co.uk',
    standaloneErrorPages: true,
    alwaysCheckForFallback: false,
    togglesUrl: 'https://config.test.api.bbci.co.uk/',
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
