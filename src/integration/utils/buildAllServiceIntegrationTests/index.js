/* eslint-disable no-console */

const path = require('path');
const rimraf = require('rimraf');
const build = require('./build');
const servicesConfig = require('../../services');

const FULL_SERVICE_INTEGRATION_TEST_DIR = '__full_service_regression_tests__';
const GENERATED_TEST_FILES_DIR = '__GENERATED_TEST_FILES__';
const services = Object.keys(servicesConfig);

rimraf.sync(
  path.join(
    __dirname,
    '../../',
    FULL_SERVICE_INTEGRATION_TEST_DIR,
    GENERATED_TEST_FILES_DIR,
  ),
);

services.forEach(service => {
  if (servicesConfig[service].variants) {
    const variants = Object.keys(servicesConfig[service].variants);

    variants.forEach(variant => {
      const pageTypes = Object.keys(servicesConfig[service].variants[variant]);

      pageTypes.forEach(pageType => {
        const pathname = servicesConfig[service].variants[variant][pageType];

        build({ service, pageType, pathname, variant });
      });
    });
  } else {
    const pageTypes = Object.keys(servicesConfig[service]);

    pageTypes.forEach(pageType => {
      const pathname = servicesConfig[service][pageType];

      build({ service, pageType, pathname });
    });
  }
});
