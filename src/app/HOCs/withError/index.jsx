import React from 'react';
import { string, element, shape } from 'prop-types';
import ErrorMain from '../../containers/ErrorMain';

const WithError = Component => {
  const ErrorContainer = ({ error, ...props }) => {
    if (!error) return <Component {...props} />;
    return <ErrorMain status={500} />;
  };

  ErrorContainer.propTypes = {
    error: shape({ message: string.isRequired }),
  };

  ErrorContainer.defaultProps = {
    error: null,
  };

  return ErrorContainer;
};

WithError.propTypes = {
  Component: element,
};

export default WithError;
