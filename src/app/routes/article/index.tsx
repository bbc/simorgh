import React from 'react';
import { ArticlePage, ErrorPage, MediaArticlePage } from '#pages/index';
import {
  articlePath,
  cpsAssetPagePath,
  legacyAssetPagePath,
} from '#app/routes/utils/regex';
import {
  ARTICLE_PAGE,
  CORRESPONDENT_STORY_PAGE,
  MEDIA_ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
  ERROR_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
} from '#app/routes/utils/pageTypes';
import { Article } from '#app/models/types/optimo';
import getInitialData from '#app/routes/article/getInitialData';

type SupportedPageTypes =
  | typeof ARTICLE_PAGE
  | typeof CORRESPONDENT_STORY_PAGE
  | typeof STORY_PAGE
  | typeof PHOTO_GALLERY_PAGE
  | typeof MEDIA_ARTICLE_PAGE
  | typeof MEDIA_ASSET_PAGE;

const ArticleVariation = (props: { pageData: Article }) => {
  const consumableAsSFV = props?.pageData?.metadata?.consumableAsSFV ?? false;

  const pageType = (
    consumableAsSFV ? MEDIA_ARTICLE_PAGE : props?.pageData?.metadata?.type
  ) as SupportedPageTypes;

  const PageType = {
    [ARTICLE_PAGE]: ArticlePage,
    [CORRESPONDENT_STORY_PAGE]: ArticlePage,
    [STORY_PAGE]: ArticlePage,
    [PHOTO_GALLERY_PAGE]: ArticlePage,
    [MEDIA_ARTICLE_PAGE]: MediaArticlePage,
    [MEDIA_ASSET_PAGE]: MediaArticlePage,
  }[pageType];

  return PageType ? (
    <PageType {...props} pageType={pageType} />
  ) : (
    <ErrorPage {...props} pageType={ERROR_PAGE} errorCode={404} />
  );
};

export default {
  path: [articlePath, cpsAssetPagePath, legacyAssetPagePath],
  exact: true,
  component: ArticleVariation,
  getInitialData,
  pageType: ARTICLE_PAGE,
};
