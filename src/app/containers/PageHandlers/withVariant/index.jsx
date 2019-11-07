import React from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import getVariantRedirectUrl from './getVariantRedirectUrl';

const WithVariant = Component => {
  const VariantContainer = props => {
    const { service, variant } = useParams();
    const location = useLocation();

    const redirectPath = getVariantRedirectUrl(props, service, variant);

    if (!redirectPath) {
      return <Component {...props} />;
    }

    return (
      <Redirect
        to={{
          ...location,
          pathname: redirectPath,
        }}
      />
    );
  };

  return VariantContainer;
};

export default WithVariant;
