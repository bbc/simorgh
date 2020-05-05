global.Cypress = {
  env: () => {
    return 'local';
  },
};

const getPaths = require('../../cypress/support/helpers/getPaths');
const services = require('../../cypress/support/config/services');

const getUrls = () => {
  const urlsToValidate = [];
  Object.keys(services).forEach(service => {
    Object.keys(services[service].pageTypes)
      .filter(pageType => !pageType.startsWith('error'))
      .forEach(pageType => {
        const paths = getPaths(service, pageType);
        const urls = paths.map(path => `http://localhost:7080${path}`);

        urlsToValidate.push(...urls);
      });
  });

  return urlsToValidate;
};

module.exports = getUrls;
