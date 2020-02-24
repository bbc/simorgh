import React from 'react';
import { shape } from 'prop-types';
import pipe from 'ramda/src/pipe';
import articlePropTypes from '#models/propTypes/article';
import ArticleMain from '../../containers/ArticleMain';

import withVariant from '../../containers/PageHandlers/withVariant';
import withContexts from '../../containers/PageHandlers/withContexts';
import withPageWrapper from '../../containers/PageHandlers/withPageWrapper';
import withError from '../../containers/PageHandlers/withError';
import withLoading from '../../containers/PageHandlers/withLoading';
import withData from '../../containers/PageHandlers/withData';

const ArticleContainer = ({ pageData }) => (
  <ArticleMain articleData={pageData} />
);

ArticleContainer.propTypes = {
  pageData: shape(articlePropTypes),
};

ArticleContainer.defaultProps = {
  pageData: null,
};

const EnhancedArticleContainer = pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
  withVariant,
)(ArticleContainer);

export default EnhancedArticleContainer;
