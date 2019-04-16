import React from 'react';
import { shape } from 'prop-types';
import { compose } from 'recompose';
import articlePropTypes from '../../models/propTypes/article';
import ArticleMain from '../ArticleMain';

import WithError from '../PageHandlers/withError';
import WithLoading from '../PageHandlers/withLoading';
import WithPageWrapper from '../PageHandlers/withPageWrapper';
import WithData from '../PageHandlers/withData';

const ArticleContainer = ({ articleData }) => (
  <ArticleMain articleData={articleData} />
);

ArticleContainer.propTypes = {
  articleData: shape(articlePropTypes),
};

ArticleContainer.defaultProps = {
  articleData: null,
};

const EnhancedArticleContainer = compose(
  WithPageWrapper,
  WithLoading,
  WithError,
  WithData,
)(ArticleContainer);

export default EnhancedArticleContainer;
