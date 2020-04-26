const SERVICES_CONFIG = require('./services');

module.exports = {
  SERVICES_CONFIG,
  SERVICES: Object.keys(SERVICES_CONFIG),
  SERVICES_TESTS_DIR: 'services',
};
