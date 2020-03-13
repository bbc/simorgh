/* eslint-disable global-require */
const getURLs = () => {
  global.Cypress = { env: () => {} };
  const services = require('../../cypress/support/config/services');

  const urls = {};
  Object.keys(services).forEach(service => {
    Object.keys(services[service].pageTypes).forEach(pageType => {
      const { paths } = services[service].pageTypes[pageType];
      const livePaths = (paths && paths.live) || [];
      livePaths.forEach(path => {
        urls[path] = `https://www.bbc.com${path}`;
      });
    });
  });
  return urls;
};

module.exports = getURLs;
