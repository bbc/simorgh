import React from 'react';
import { string, element } from 'prop-types';
import ErrorMain from '../../ErrorMain';

const WithError = Component => {
  const ErrorContainer = ({ error, ...props }) => {
    if (!error) return <Component {...props} />;
    return <ErrorMain status={500} />;
  };

  ErrorContainer.propTypes = {
    error: string,
  };

  ErrorContainer.defaultProps = {
    error: true,
  };

  return ErrorContainer;
};

WithError.propTypes = {
  Component: element,
};

export default WithError;
