import React from 'react';
import { shape } from 'prop-types';
import compose from 'ramda/src/compose';
import frontPagePropTypes from '#models/propTypes/frontPage';
import FeatureIndexMain from '../FeatureIndexMain';

import withContexts from '../PageHandlers/withContexts';
import withPageWrapper from '../PageHandlers/withPageWrapper';
import withLoading from '../PageHandlers/withLoading';
import withError from '../PageHandlers/withError';
import withData from '../PageHandlers/withData';

const FeatureIndexContainer = ({ pageData }) => (
  <FeatureIndexMain featureIndexData={pageData} />
);

FeatureIndexContainer.propTypes = {
  pageData: shape(frontPagePropTypes),
};

FeatureIndexContainer.defaultProps = {
  pageData: null,
};

const EnhancedFeatureIndexContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(FeatureIndexContainer);

export default EnhancedFeatureIndexContainer;
