global.Cypress = {
  env: () => 'local',
};

const getPaths = require('../../cypress/support/helpers/getPaths');
const services = require('../../cypress/support/config/services');

const baseUrls = {
  local: 'http://localhost:7080',
  test: 'https://www.test.bbc.com',
  live: 'https://www.bbc.com',
};

const getHost = () => {
  const env = process.env.SIMORGH_APP_ENV || 'local';
  global.Cypress.env = () => env;
  return baseUrls[env];
};

const getUrls = () => {
  const urlsToValidate = [];
  const host = getHost();
  Object.keys(services).forEach(service => {
    Object.keys(services[service].pageTypes)
      .filter(pageType => !pageType.startsWith('error'))
      .forEach(pageType => {
        const paths = getPaths(service, pageType);
        const urls = paths.map(path => `${host}${path}`);

        urlsToValidate.push(...urls);
      });
  });

  return urlsToValidate;
};

module.exports = getUrls;
