const { SERVICES_CONFIG } = require('../constants');

const getPageTypes = service => Object.keys(SERVICES_CONFIG[service]);

const getPathname = (service, pageType) => SERVICES_CONFIG[service][pageType];

const hasVariants = service => Boolean(SERVICES_CONFIG[service].variants);

const getVariants = service => Object.keys(SERVICES_CONFIG[service].variants);

const getVariantPageTypes = (service, variant) =>
  Object.keys(SERVICES_CONFIG[service].variants[variant]);

const getVariantPathname = (service, variant, pageType) =>
  SERVICES_CONFIG[service].variants[variant][pageType];

module.exports = {
  getPageTypes,
  getPathname,
  hasVariants,
  getVariants,
  getVariantPageTypes,
  getVariantPathname,
};
