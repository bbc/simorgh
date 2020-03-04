import React from 'react';
import { string, element, shape } from 'prop-types';
import ErrorPage from '#pages/ErrorPage';

const WithError = Component => {
  const ErrorContainer = ({ error, ...props }) => {
    if (!error) return <Component {...props} />;
    return <ErrorPage errorCode={500} />;
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
