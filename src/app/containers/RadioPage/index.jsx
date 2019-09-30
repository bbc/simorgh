import React from 'react';
import compose from 'ramda/src/compose';
import RadioPageMain from '../RadioPageMain';

import withContexts from '../PageHandlers/withContexts';
import withPageWrapper from '../PageHandlers/withPageWrapper';
import withError from '../PageHandlers/withError';
import withLoading from '../PageHandlers/withLoading';
import withData from '../PageHandlers/withData';

const RadioContainer = props => {
  return <RadioPageMain {...props} />;
};

const EnhancedRadioContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(RadioContainer);

export default EnhancedRadioContainer;
