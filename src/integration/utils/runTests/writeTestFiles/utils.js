const { SERVICES_CONFIG } = require('../constants');

const getPageTypes = service => Object.keys(SERVICES_CONFIG[service]);

const getPathnames = (service, pageType) => SERVICES_CONFIG[service][pageType];

module.exports = {
  getPageTypes,
  getPathnames,
};
