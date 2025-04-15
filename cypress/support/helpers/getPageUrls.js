const path = require('ramda/src/path');

global.Cypress = { env: () => {} }; // Fake Cypress.env
const services = require('../config/services');

const getPageTypes = service => path([service, 'pageTypes'], services);

const getPageUrls = ({ pageType, environment, isSmoke }) =>
  Object.keys(services)
    .map(getPageTypes)
    .map(pageTypes => path([pageType], pageTypes))
    .filter(config => (isSmoke ? config?.smoke : true))
    .filter(config => config?.environments?.[environment]?.enabled === true)
    .map(config => path(['environments', environment, 'paths'], config))
    .filter(Boolean);

module.exports = {
  getPageUrls,
};
