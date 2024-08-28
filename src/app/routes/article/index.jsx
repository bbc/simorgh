import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { ArticlePage, ErrorPage, MediaArticlePage } from '#pages';
import { articlePath } from '#routes/utils/regex';
import {
  ARTICLE_PAGE,
  MEDIA_ARTICLE_PAGE,
  ERROR_PAGE,
} from '#routes/utils/pageTypes';
import getInitialData from './getInitialData';

const ArticleVariation = props => {
  const consumable = pathOr(
    false,
    ['pageData', 'metadata', 'consumableAsSFV'],
    props,
  );

  const type = consumable ? MEDIA_ARTICLE_PAGE : ARTICLE_PAGE;

  const PageType = {
    [ARTICLE_PAGE]: ArticlePage,
    [MEDIA_ARTICLE_PAGE]: MediaArticlePage,
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
