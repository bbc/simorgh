const servicesWithVariants = {
  serbian: ['cyr', 'lat'],
  ukchina: ['simp', 'trad'],
  zhongwen: ['simp', 'trad'],
};

const variantHandler = (service, variant) => {
  const allowedVariants = servicesWithVariants[service];
  const cleanVariant = variant && variant.replace('/', '');

  if (allowedVariants) {
    return allowedVariants.includes(cleanVariant)
      ? cleanVariant
      : allowedVariants[0];
  }

  return undefined;
};

export default variantHandler;
