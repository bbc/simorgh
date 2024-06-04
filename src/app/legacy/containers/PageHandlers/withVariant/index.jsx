import pathOr from 'ramda/src/pathOr';
import React from 'react';
import { Redirect } from 'react-router-dom';
import getVariantRedirectUrl from './getVariantRedirectUrl';

const WithVariant = Component => {
  const VariantContainer = props => {
    const { service, variant = null } = props;

    const { path, params } = pathOr({}, ['match'], props);

    // Still need to do something about this
    const redirectPath = getVariantRedirectUrl({
      path,
      params,
      service,
      variant,
    });

    if (!redirectPath) {
      return <Component {...props} />;
    }

    return <Redirect to={redirectPath} />;
  };

  return VariantContainer;
};

export default WithVariant;
