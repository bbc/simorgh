/* eslint-disable no-console */

const writeTestFile = require('./writeTestFile');
const { SERVICES } = require('../constants');
const {
  getPageTypes,
  getPathname,
  hasVariants,
  getVariants,
  getVariantPageTypes,
  getVariantPathname,
} = require('./utils');

module.exports = () => {
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
};
