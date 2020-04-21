/* eslint-disable no-console */

const path = require('path');
const rimraf = require('rimraf');
const writeTestFile = require('./writeTestFile');
const {
  SERVICES,
  SERVICES_CONFIG,
  FULL_SERVICE_INTEGRATION_TEST_DIR,
  GENERATED_TEST_FILES_DIR,
} = require('./constants');

rimraf.sync(
  path.join(
    __dirname,
    '../../',
    FULL_SERVICE_INTEGRATION_TEST_DIR,
    GENERATED_TEST_FILES_DIR,
  ),
);

const getPageTypes = service => Object.keys(SERVICES_CONFIG[service]);
const getPathname = (service, pageType) => SERVICES_CONFIG[service][pageType];

const hasVariants = service => SERVICES_CONFIG[service].variants;
const getVariants = service => Object.keys(SERVICES_CONFIG[service].variants);
const getVariantPageTypes = (service, variant) =>
  Object.keys(SERVICES_CONFIG[service].variants[variant]);
const getVariantPathname = (service, variant, pageType) =>
  SERVICES_CONFIG[service].variants[variant][pageType];

SERVICES.forEach(service => {
  if (hasVariants(service)) {
    const variants = getVariants(service);

    variants.forEach(variant => {
      const pageTypes = getVariantPageTypes(service, variant);

      pageTypes.forEach(pageType => {
        const pathname = getVariantPathname(service, variant, pageType);

        writeTestFile({ service, pageType, pathname, variant });
      });
    });
  } else {
    const pageTypes = getPageTypes(service);

    pageTypes.forEach(pageType => {
      const pathname = getPathname(service, pageType);

      writeTestFile({ service, pageType, pathname });
    });
  }
});
