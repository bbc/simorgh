import React from 'react';
import { number } from 'prop-types';
import compose from 'ramda/src/compose';
import ErrorMain from '../ErrorMain';

import withContexts from '../PageHandlers/withContexts';
import withPageWrapper from '../PageHandlers/withPageWrapper';
import withError from '../PageHandlers/withError';
import withLoading from '../PageHandlers/withLoading';
import withData from '../PageHandlers/withData';

const ErrorContainer = ({ status }) => <ErrorMain status={status} />;

ErrorContainer.propTypes = { status: number.isRequired };

const EnhancedErrorContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(ErrorContainer);

export default EnhancedErrorContainer;
