import React from 'react';
import { shape } from 'prop-types';
import compose from '../../helpers/compose';
import articlePropTypes from '../../models/propTypes/article';
import ArticleMain from '../ArticleMain';

import withError from '../PageHandlers/withError';
import withLoading from '../PageHandlers/withLoading';
import withPageWrapper from '../PageHandlers/withPageWrapper';
import withData from '../PageHandlers/withData';

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
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(ArticleContainer);

export default EnhancedArticleContainer;
