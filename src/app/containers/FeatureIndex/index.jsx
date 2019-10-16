import React from 'react';
import { shape } from 'prop-types';
import compose from 'ramda/src/compose';
import featureIndexPropTypes from '#models/propTypes/featureIndex';
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
  pageData: shape(featureIndexPropTypes),
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
