const servicesWithVariants = {
  serbian: ['cyr', 'lat'],
  ukchina: ['simp', 'trad'],
  zhongwen: ['simp', 'trad'],
};

// Remove leading slash from variant
const variantSanitzer = variant => variant && variant.replace('/', '');

export const variantDefaulter = (service, rawVariant) => {
  const allowedVariants = servicesWithVariants[service];
  const variant = variantSanitzer(rawVariant);

  if (allowedVariants) {
    return allowedVariants.includes(variant) ? variant : allowedVariants[0];
  }

  return variant;
};

export const variantHandler = (service, rawVariant) => {
  const allowedVariants = servicesWithVariants[service];
  const variant = variantDefaulter(service, rawVariant);

  if (allowedVariants && allowedVariants.includes(variant)) {
    return variant;
  }

  return undefined;
};
