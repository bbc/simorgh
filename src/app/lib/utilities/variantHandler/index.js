import pathOr from 'ramda/src/pathOr';

export const servicesWithVariants = {
  // the first element in the array is the default variant
  serbian: ['lat', 'cyr'],
  ukchina: ['simp', 'trad'],
  uzbek: ['default', 'cyr', 'lat'],
  zhongwen: ['simp', 'trad'],
};

export const variants = ['simp', 'trad', 'lat', 'cyr', 'default'];

const variantCookieConfig = {
  ukchina: 'chinese',
  zhongwen: 'chinese',
};

  // working logic
export const uzbekVariantOverride = ({ service, variant, pageType }) => {
  if (service !== 'uzbek') {
    return variant;
  }
  if (pageType === 'article' && variant === null) {
    return 'cyr';
  }
  return variant;
};

export const getVariantCookieName = service =>
  pathOr(service, [service], variantCookieConfig);

// Remove leading slash from variant
export const variantSanitiser = variant => variant && variant.replace('/', '');

// If service has variants, use it or default to first variant in array
// If service doesnt have variants, return 'default'
export const getVariant = ({ service, variant }) => {
  const allowedVariants = servicesWithVariants[service];

  if (allowedVariants) {
    return allowedVariants.includes(variant) ? variant : allowedVariants[0];
  }

  return 'default';
};
