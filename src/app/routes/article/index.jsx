import React from 'react';
import path from 'ramda/src/path';
import { ArticlePage, ErrorPage } from '#pages';
import { articlePath } from '#app/routes/utils/regex';
import {
  ARTICLE_PAGE,
  ZONED_ARTICLE_PAGE,
  ERROR_PAGE,
} from '#app/routes/utils/pageTypes';
import getInitialData from './getInitialData';

const ArticleVariation = props => {
  const type = path(['pageData', 'metadata', 'type'], props);

  const PageType = {
    [ARTICLE_PAGE]: ArticlePage,
    [ZONED_ARTICLE_PAGE]: ArticlePage,
  }[type];

  return PageType ? (
    <PageType {...props} pageType={type} />
  ) : (
    <ErrorPage {...props} pageType={ERROR_PAGE} errorCode={404} />
  );
};

export default {
  path: articlePath,
  exact: true,
  component: ArticleVariation,
  getInitialData,
  pageType: ARTICLE_PAGE,
};
