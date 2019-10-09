import React from 'react';
import compose from 'ramda/src/compose';
import CpsAssetPageMain from '../CpsAssetPageMain';
import withContexts from '../PageHandlers/withContexts';
import withPageWrapper from '../PageHandlers/withPageWrapper';
import withError from '../PageHandlers/withError';
import withLoading from '../PageHandlers/withLoading';
import withData from '../PageHandlers/withData';

const CpsContainer = props => {
  return <CpsAssetPageMain {...props} />;
};

const EnhancedCpsContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(CpsContainer);

export default EnhancedCpsContainer;
