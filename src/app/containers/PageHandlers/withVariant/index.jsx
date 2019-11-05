import React from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import { variantSanitiser, getVariant } from '#lib/utilities/variantHandler';

const WithVariant = Component => {
  const VariantContainer = props => {
    const { service, variant } = useParams();
    const location = useLocation();
    const defaultVariant = getVariant({ service, variant });
    const sanitizedVariant = variantSanitiser(variant);

    if (!sanitizedVariant && defaultVariant && defaultVariant !== 'default') {
      return (
        <Redirect
          to={{
            ...location,
            pathname: `${location.pathname}/${defaultVariant}`,
          }}
        />
      );
    }

    return <Component {...props} />;
  };

  return VariantContainer;
};

export default WithVariant;
