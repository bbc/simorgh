import React from 'react';
import {
  ArticlePage,
  ErrorPage,
  MediaArticlePage,
  FeatureIdxPage,
} from '#pages';
import {
  articlePath,
  cpsAssetPagePath,
  legacyAssetPagePath,
} from '#app/routes/utils/regex';
import {
  ARTICLE_PAGE,
  MEDIA_ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
  ERROR_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  FEATURE_INDEX_PAGE,
} from '#app/routes/utils/pageTypes';
import getInitialData from './getInitialData';

const ArticleVariation = props => {
  const consumableAsSFV = props?.pageData?.metadata?.consumableAsSFV ?? false;
  const pageType = props?.pageData?.metadata?.type;

  const pageTypeToUse = consumableAsSFV ? MEDIA_ARTICLE_PAGE : pageType;

  const PageType = {
    [ARTICLE_PAGE]: ArticlePage,
    [STORY_PAGE]: ArticlePage,
    [PHOTO_GALLERY_PAGE]: ArticlePage,
    [MEDIA_ARTICLE_PAGE]: MediaArticlePage,
    [MEDIA_ASSET_PAGE]: MediaArticlePage,
    [FEATURE_INDEX_PAGE]: FeatureIdxPage,
  }[pageTypeToUse];

  return PageType ? (
    <PageType {...props} pageType={pageTypeToUse} />
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
