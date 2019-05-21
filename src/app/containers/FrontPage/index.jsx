import React from 'react';
import { shape } from 'prop-types';
import compose from '../../helpers/compose';
import articlePropTypes from '../../models/propTypes/article';
import FrontPageMain from '../FrontPageMain';

import withPageWrapper from '../PageHandlers/withPageWrapper';
import withLoading from '../PageHandlers/withLoading';
import withError from '../PageHandlers/withError';
import withData from '../PageHandlers/withData';

const FrontPageContainer = ({ pageData }) => (
  <FrontPageMain frontPageData={pageData} />
);

FrontPageContainer.propTypes = {
  pageData: shape(articlePropTypes),
};

FrontPageContainer.defaultProps = {
  pageData: null,
};

const EnhancedFrontPageContainer = compose(
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(FrontPageContainer);

export default EnhancedFrontPageContainer;
