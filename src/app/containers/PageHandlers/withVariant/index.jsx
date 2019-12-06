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
  const defaultVariant = getVariant({ service, variant });
  const sanitizedVariant = variantSanitiser(variant);
  const cookieVariant = getPreferredVariantCookie(service);
  const isNotDefaultVariant = defaultVariant !== 'default';
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

  if (sanitizedVariant && cookieVariant && sanitizedVariant !== cookieVariant) {
    return redirect(location, getRedirectUrlFromVariant(cookieVariant));
  }

  if (!sanitizedVariant && isNotDefaultVariant) {
    return redirect(location, getRedirectUrlFromVariant(defaultVariant));
  }

  if (sanitizedVariant) setPreferredVariantCookie(service, sanitizedVariant);

  return <Component {...props} />;
};

export default withVariant;
