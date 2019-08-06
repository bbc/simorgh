import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { number, shape } from 'prop-types';
import compose from 'ramda/src/compose';
import ErrorMain from '../ErrorMain';

import withContexts from '../PageHandlers/withContexts';
import withPageWrapper from '../PageHandlers/withPageWrapper';
import withLoading from '../PageHandlers/withLoading';

const ErrorContainer = ({ data }) => (<ErrorMain status={pathOr(500, ['status'], data)} />);

ErrorContainer.propTypes = {
  data: shape({
    status: number.isRequired,
  }).isRequired,
};

const EnhancedErrorContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
)(ErrorContainer);

export default EnhancedErrorContainer;
