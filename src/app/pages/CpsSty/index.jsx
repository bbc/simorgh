import React from 'react';
import compose from 'ramda/src/compose';
import CpsAssetPageMain from '../../containers/CpsAssetPageMain';
import withContexts from '../../containers/PageHandlers/withContexts';
import withPageWrapper from '../../containers/PageHandlers/withPageWrapper';
import withError from '../../containers/PageHandlers/withError';
import withLoading from '../../containers/PageHandlers/withLoading';
import withData from '../../containers/PageHandlers/withData';

const CpsStyContainer = props => {
  console.log(`STY Container`);
  return <CpsAssetPageMain {...props} />;
};

const EnhancedCpsStyContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(CpsStyContainer);

export default EnhancedCpsStyContainer;
