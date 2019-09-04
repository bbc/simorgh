const servicesWithVariants = {
  serbian: ['cyr', 'lat'],
  ukchina: ['simp', 'trad'],
  zhongwen: ['simp', 'trad'],
};

// Remove leading slash from variant
export const variantSanitzer = variant => variant && variant.replace('/', '');

// If service has variants, use it or default to first variant in array
// If service doesnt have variants, return 'default'
export const variantDataKey = (service, rawVariant) => {
  const allowedVariants = servicesWithVariants[service];
  const variant = variantSanitzer(rawVariant);

  if (allowedVariants) {
    return allowedVariants.includes(variant) ? variant : allowedVariants[0];
  }

  return 'default';
};
