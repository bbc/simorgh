import React from 'react';
import compose from 'ramda/src/compose';
import MediaPageMain from '../MediaPageMain';

import withContexts from '../PageHandlers/withContexts';
import withPageWrapper from '../PageHandlers/withPageWrapper';
import withError from '../PageHandlers/withError';
import withLoading from '../PageHandlers/withLoading';
import withData from '../PageHandlers/withData';

const MediaContainer = props => {
  return <MediaPageMain {...props} />;
};

const EnhancedMediaContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(MediaContainer);

export default EnhancedMediaContainer;
