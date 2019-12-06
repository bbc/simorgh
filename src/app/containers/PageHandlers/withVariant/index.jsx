import React from 'react';
import pathToRegexp from 'path-to-regexp';
import { pathOr } from 'ramda';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import { variantSanitiser, getVariant } from '#lib/utilities/variantHandler';
import {
  getPreferredVariantCookie,
  setPreferredVariantCookie,
} from '#contexts/UserContext/cookies';

const redirect = (location, pathname) => {
  return (
    <Redirect
      to={{
        ...location,
        pathname,
      }}
    />
  );
};

const getRedirectUrl = (path, params, variant) => {
  const pathTo = pathToRegexp.compile(path);

  return pathTo(
    {
      ...params,
      variant: `/${variant}`,
    },
    {
      encode: value => value,
    },
  );
};

const withVariant = Component => props => {
  const { service, variant } = useParams();
  const location = useLocation();
  const defaultServiceVariant = getVariant({ service, variant });
  const sanitizedVariantFromRoute = variantSanitiser(variant);
  const preferredCookieVariant = getPreferredVariantCookie(service);
  const serviceHasVariants = defaultServiceVariant !== 'default';
  const { path } = pathOr({}, ['match'], props);

  const getRedirectUrlFromVariant = variantOverride =>
    getRedirectUrl(
      path,
      {
        service,
        variant,
      },
      variantOverride,
    );

  if (
    sanitizedVariantFromRoute &&
    preferredCookieVariant &&
    sanitizedVariantFromRoute !== preferredCookieVariant
  ) {
    return redirect(
      location,
      getRedirectUrlFromVariant(preferredCookieVariant),
    );
  }

  if (!sanitizedVariantFromRoute && serviceHasVariants) {
    return redirect(location, getRedirectUrlFromVariant(defaultServiceVariant));
  }

  if (sanitizedVariantFromRoute)
    setPreferredVariantCookie(service, sanitizedVariantFromRoute);

  return <Component {...props} />;
};

export default withVariant;
