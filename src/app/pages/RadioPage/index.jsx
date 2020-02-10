import React from 'react';
import pipe from 'ramda/src/pipe';
import RadioPageMain from '../../containers/RadioPageMain';

import withContexts from '../../containers/PageHandlers/withContexts';
import withPageWrapper from '../../containers/PageHandlers/withPageWrapper';
import withError from '../../containers/PageHandlers/withError';
import withLoading from '../../containers/PageHandlers/withLoading';
import withData from '../../containers/PageHandlers/withData';

const RadioContainer = props => {
  return <RadioPageMain {...props} />;
};

const EnhancedRadioContainer = pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
)(RadioContainer);

export default EnhancedRadioContainer;
