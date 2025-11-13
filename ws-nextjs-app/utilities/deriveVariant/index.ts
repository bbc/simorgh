import { Variants } from '#app/models/types/global';

export default (variantParam?: string[] | null) => {
  if (!variantParam || variantParam.length === 0) return null;

  const [variant] = variantParam[0].split('.');

  return (variant as Variants) || null;
};
