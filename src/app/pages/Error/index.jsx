import React from 'react';
import { number } from 'prop-types';
import pipe from 'ramda/src/pipe';
import ErrorMain from '../../containers/ErrorMain';

import withContexts from '../../containers/PageHandlers/withContexts';
import withPageWrapper from '../../containers/PageHandlers/withPageWrapper';
import withLoading from '../../containers/PageHandlers/withLoading';

const ErrorContainer = ({ status, errorCode }) => {
  console.log('oops');
  return <ErrorMain status={errorCode || status} />;
};

ErrorContainer.propTypes = {
  status: number.isRequired,
  errorCode: number,
};

ErrorContainer.defaultProps = {
  errorCode: null,
};

const EnhancedErrorContainer = pipe(
  withLoading,
  withPageWrapper,
  withContexts,
)(ErrorContainer);

export default EnhancedErrorContainer;
