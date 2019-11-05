import path from 'ramda/src/path';
import pathToRegexp from 'path-to-regexp';
import { getVariant, variantSanitiser } from '#lib/utilities/variantHandler';
import { getPreferredVariant } from '#app/contexts/UserContext/cookies';

const getVariantRedirectUrl = (props, service, variant) => {
  const cookieVariant = getPreferredVariant(service);
  const defaultVariant = getVariant({
    service,
    variant: variantSanitiser(variant),
  });
  const redirectVariant = cookieVariant || defaultVariant;

  if (!props) return null;

  const match = path(['match'], props, {});

  if (!match || !match.path) return null;

  const pathTo = pathToRegexp.compile(match.path);

  if (
    (cookieVariant && cookieVariant !== defaultVariant) ||
    (!variant && defaultVariant !== 'default')
  ) {
    return pathTo(
      {
        ...match.params,
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
