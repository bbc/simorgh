import { compile } from 'path-to-regexp';
import {
  getVariant,
  variantSanitiser,
  variants,
} from '#lib/utilities/variantHandler';
import { getPreferredVariant } from '#app/contexts/UserContext/cookies';

const getVariantRedirectUrl = ({ path, params, service, variant }) => {
  if (!path) return null;

  const cookieVariant = getPreferredVariant(service);
  const defaultVariant = getVariant({
    service,
    variant: variantSanitiser(variant),
  });

  const pathTo = compile(path);

  const isCookieVariantRedirect =
    cookieVariant &&
    cookieVariant !== defaultVariant &&
    variants.includes(cookieVariant);

  const isUrlVariantRedirect = !variant && defaultVariant !== 'default';

  const redirectVariant = isCookieVariantRedirect
    ? cookieVariant
    : defaultVariant;

  if (isCookieVariantRedirect || isUrlVariantRedirect) {
    return pathTo(
      {
        ...params,
        variant: `/${redirectVariant}`,
      },
      {
        encode: value => value,
      },
    );
  }

  return null;
};

export default getVariantRedirectUrl;
