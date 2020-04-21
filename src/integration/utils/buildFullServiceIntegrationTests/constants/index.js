const SERVICES_CONFIG = require('./services');

module.exports = {
  SERVICES_CONFIG,
  SERVICES: Object.keys(SERVICES_CONFIG),
  FULL_SERVICE_INTEGRATION_TEST_DIR: '__full_service_regression_tests__',
  GENERATED_TEST_FILES_DIR: '__GENERATED_TEST_FILES__',
};
