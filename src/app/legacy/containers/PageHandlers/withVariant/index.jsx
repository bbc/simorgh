import PropTypes from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import React from 'react';
import { Redirect } from 'react-router-dom';
import getVariantRedirectUrl from './getVariantRedirectUrl';

const WithVariant = Component => {
  const VariantContainer = props => {
    const { service, variant } = props;

    const { path, params } = pathOr({}, ['match'], props);

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

  VariantContainer.propTypes = {
    service: PropTypes.string.isRequired,
    variant: PropTypes.string,
  };

  VariantContainer.defaultProps = {
    variant: null,
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
