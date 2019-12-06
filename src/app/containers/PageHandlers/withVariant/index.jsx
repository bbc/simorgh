import React from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import { variantSanitiser, getVariant } from '#lib/utilities/variantHandler';
import {
  getPreferredVariant,
  setPreferredVariant,
} from '#contexts/UserContext/cookies';

const redirect = (location, variant) => {
  return (
    <Redirect
      to={{
        ...location,
        pathname: `${location.pathname}/${variant}`,
      }}
    />
  );
};

const withVariant = Component => {
  const VariantContainer = props => {
    const { service, variant } = useParams();
    const location = useLocation();
    const defaultVariant = getVariant({ service, variant });
    const sanitizedVariant = variantSanitiser(variant);
    const preferredVariant = getPreferredVariant(service);
    const isNotDefaultVariant = defaultVariant !== 'default';

    if (!sanitizedVariant && preferredVariant) {
      return redirect(location, preferredVariant);
    }

    if (!sanitizedVariant && isNotDefaultVariant) {
      return redirect(location, defaultVariant);
    }

    if (sanitizedVariant) setPreferredVariant(service, sanitizedVariant);

    return <Component {...props} />;
  };

  return VariantContainer;
};

export default withVariant;
