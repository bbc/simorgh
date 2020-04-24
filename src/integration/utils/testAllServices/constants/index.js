const SERVICES_CONFIG = require('./services');

module.exports = {
  SERVICES_CONFIG,
  SERVICES: Object.keys(SERVICES_CONFIG),
  FULL_SERVICE_INTEGRATION_TEST_DIR: 'allServices',
};
