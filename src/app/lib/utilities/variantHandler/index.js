import pathOr from 'ramda/src/pathOr';

export const servicesWithVariants = {
  // the first element in the array is the default variant
  serbian: ['lat', 'cyr'],
  ukchina: ['simp', 'trad'],
  uzbek: ['cyr', 'lat'],
  zhongwen: ['simp', 'trad'],
};
export const servicesWithOptionalVariants = ['uzbek'];
export const variants = ['simp', 'trad', 'lat', 'cyr', 'default'];
const variantCookieConfig = {
  ukchina: 'chinese',
  zhongwen: 'chinese',
};

export const articleVariantOverride = ({ service, variant, pageType }) => {
  if (pageType === 'article' && variant === null) {
    return servicesWithVariants[service][0];
  }
  return variant;
};

export const getVariantCookieName = service =>
  pathOr(service, [service], variantCookieConfig);
// Remove leading slash from variant
export const variantSanitiser = variant => variant && variant.replace('/', '');
// If service has variants, use it or default to first variant in array
// If service has optional variants, use it or default to default
// If service doesnt have variants, return 'default'
export const getVariant = ({ service, variant }) => {
  const allowedVariants = servicesWithVariants[service];
  const allowedOptionalVariants =
    servicesWithOptionalVariants.includes(service);
  if (allowedVariants && !allowedOptionalVariants) {
    return allowedVariants.includes(variant) ? variant : allowedVariants[0];
  }
  if (allowedVariants && allowedOptionalVariants) {
    return allowedVariants.includes(variant) ? variant : 'default';
  }
  return 'default';
};
