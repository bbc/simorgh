import { Variants } from '#app/models/types/global';

export default (variantParam?: string[] | null) => {
  if (!variantParam || !variantParam.length) return null;

  const variant = variantParam?.[0].split('.');

  if (variant.length) return variant[0] as Variants;

  return null;
};
