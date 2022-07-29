import React from 'react';
import { string, element, shape, number } from 'prop-types';
import ErrorPage from '#pages/ErrorPage/ErrorPage';

const WithError = Component => {
  const ErrorContainer = ({ error, status, ...props }) => {
    if (!error) return <Component {...props} status={status} />;

    return <ErrorPage errorCode={status || 500} />;
  };

  ErrorContainer.propTypes = {
    status: number.isRequired,
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
