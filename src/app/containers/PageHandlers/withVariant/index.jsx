import React from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import defaultVariants from '#lib/config/defaultVariants';

const WithVariant = Component => {
  const VariantContainer = props => {
    const { service, variant } = useParams();
    const location = useLocation();
    const defaultVariant = defaultVariants[service];

    if (!variant && defaultVariant) {
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
