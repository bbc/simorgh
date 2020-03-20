import PropTypes from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import React from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import getVariantRedirectUrl from './getVariantRedirectUrl';

const WithVariant = Component => {
  const VariantContainer = props => {
    const { service, variant } = useParams();
    const location = useLocation();

    const { path, params } = pathOr({}, ['match'], props);

    const redirectPath = getVariantRedirectUrl({
      path,
      params,
      service,
      variant,
    });
    console.log('bdsfhsf' + redirectPath);
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

WithVariant.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      service: PropTypes.node,
      variant: PropTypes.node,
      local: PropTypes.node,
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default WithVariant;
