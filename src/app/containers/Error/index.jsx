import React from 'react';
import { number } from 'prop-types';
import compose from 'ramda/src/compose';
import ErrorMain from '../ErrorMain';

import withContexts from '../PageHandlers/withContexts';
import withPageWrapper from '../PageHandlers/withPageWrapper';
import withLoading from '../PageHandlers/withLoading';

const ErrorContainer = ({ status }) => <ErrorMain status={status} />;

ErrorContainer.propTypes = {
  status: number.isRequired,
};

const EnhancedErrorContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
)(ErrorContainer);

export default EnhancedErrorContainer;
