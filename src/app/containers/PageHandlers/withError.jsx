import React from 'react';
import { string } from 'prop-types';
import ErrorMain from '../ErrorMain';

const WithError = Component => ({ error, ...props }) => {
  if (!error) return <Component {...props} />;
  return <ErrorMain status={500} />;
};

WithError.propTypes = {
  error: string,
};

WithError.defaultProps = {
  error: true,
};

export default WithError;
