import React from 'react';
import { shape } from 'prop-types';
import compose from 'ramda/src/compose';
import articlePropTypes from '../../models/propTypes/article';
import ArticleMain from '../ArticleMain';

import withContexts from '../PageHandlers/withContexts';
import withPageWrapper from '../PageHandlers/withPageWrapper';
import withError from '../PageHandlers/withError';
import withLoading from '../PageHandlers/withLoading';
import withData from '../PageHandlers/withData';

const ArticleContainer = ({ pageData }) => (
  <ArticleMain articleData={pageData} />
);

ArticleContainer.propTypes = {
  pageData: shape(articlePropTypes),
};

ArticleContainer.defaultProps = {
  pageData: null,
};

const EnhancedArticleContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(ArticleContainer);

export default EnhancedArticleContainer;
