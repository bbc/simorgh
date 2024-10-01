import React from 'react';
import ErrorPage from '#pages/ErrorPage/ErrorPage';

const WithError = Component => {
  const ErrorContainer = ({ error = null, status, ...props }) => {
    if (!error) return <Component {...props} status={status} />;

    return <ErrorPage errorCode={status || 500} />;
  };

  return ErrorContainer;
};

export default WithError;
