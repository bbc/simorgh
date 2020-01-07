import React from 'react';
import compose from 'ramda/src/compose';
import CpsAssetPageMain from '../../containers/CpsAssetPageMain';
import withContexts from '../../containers/PageHandlers/withContexts';
import withPageWrapper from '../../containers/PageHandlers/withPageWrapper';
import withError from '../../containers/PageHandlers/withError';
import withLoading from '../../containers/PageHandlers/withLoading';
import withData from '../../containers/PageHandlers/withData';

const CpsPglContainer = props => {
  console.log(`PGL Container`);
  return <CpsAssetPageMain {...props} />;
};

const EnhancedCpsPglContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(CpsPglContainer);

export default EnhancedCpsPglContainer;
