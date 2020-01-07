import React from 'react';
import compose from 'ramda/src/compose';
import CpsAssetPageMain from '../../containers/CpsAssetPageMain';
import withContexts from '../../containers/PageHandlers/withContexts';
import withPageWrapper from '../../containers/PageHandlers/withPageWrapper';
import withError from '../../containers/PageHandlers/withError';
import withLoading from '../../containers/PageHandlers/withLoading';
import withData from '../../containers/PageHandlers/withData';

const CpsMapContainer = props => {
  return <CpsAssetPageMain {...props} />;
};

const EnhancedCpsMapContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(CpsMapContainer);

export default EnhancedCpsMapContainer;
