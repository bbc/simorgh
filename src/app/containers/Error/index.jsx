import React from 'react';
import { number } from 'prop-types';
import compose from 'ramda/src/compose';
import ErrorMain from '../ErrorMain';

import withContexts from '../PageHandlers/withContexts';
import withPageWrapper from '../PageHandlers/withPageWrapper';
import withLoading from '../PageHandlers/withLoading';

const ErrorContainer = ({ status, errorCode }) => (
  <ErrorMain status={errorCode || status} />
);

ErrorContainer.propTypes = {
  status: number.isRequired,
  errorCode: number,
};

ErrorContainer.defaultProps = {
  errorCode: null,
};

const EnhancedErrorContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
)(ErrorContainer);

export default EnhancedErrorContainer;
