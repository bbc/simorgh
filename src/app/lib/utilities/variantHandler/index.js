import { useParams } from 'react-router-dom';

export const servicesWithVariants = {
  // the first element in the array is the default variant
  serbian: ['lat', 'cyr'],
  ukchina: ['simp', 'trad'],
  zhongwen: ['simp', 'trad'],
};

export const variants = ['simp', 'trad', 'lat', 'cyr', 'default'];

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

export const useCurrentVariant = () => {
  const { variant } = useParams();
  return variant;
};

export const getOtherVariant = (service, variant) => {
  if (!service || !variant) return null;

  const foundVariants = servicesWithVariants[service];
  if (!foundVariants) return null;

  const index = foundVariants.findIndex(
    item => item === variantSanitiser(variant),
  );
  if (index === -1) return null;
  return index === 0 ? foundVariants[1] : foundVariants[0];
};
