import React from 'react';
import { shape } from 'prop-types';
import compose from '../../helpers/compose';
import articlePropTypes from '../../models/propTypes/article';
import ArticleMain from '../ArticleMain';

import withPageWrapper from '../PageHandlers/withPageWrapper';
import withError from '../PageHandlers/withError';
import withLoading from '../PageHandlers/withLoading';
import withData from '../PageHandlers/withData';

const ArticleContainer = ({ assetData }) => (
  <ArticleMain articleData={assetData} />
);

ArticleContainer.propTypes = {
  assetData: shape(articlePropTypes),
};

ArticleContainer.defaultProps = {
  assetData: null,
};

const EnhancedArticleContainer = compose(
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(ArticleContainer);

export default EnhancedArticleContainer;
