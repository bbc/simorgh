import React from 'react';
import { number } from 'prop-types';
import compose from 'ramda/src/compose';
import ErrorMain from '../../containers/ErrorMain';

import withContexts from '../../containers/PageHandlers/withContexts';
import withPageWrapper from '../../containers/PageHandlers/withPageWrapper';
import withLoading from '../../containers/PageHandlers/withLoading';

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
