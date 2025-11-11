import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { PageTypes } from '#app/models/types/global';
import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import withLiteRedirect from '#nextjs/utilities/liteRedirect/liteRedirect';
import { ArticlePageProps } from './types';
import handleArticleRoute from './handleArticleRoute';

const ArticlePage = dynamic(() => import('#app/pages/ArticlePage/ArticlePage'));
const MediaArticlePage = dynamic(
  () => import('#app/pages/MediaArticlePage/MediaArticlePage'),
);

type PageProps = {
  pageType?: PageTypes;
} & ArticlePageProps;

const withFuncs = (component: React.ComponentType<PageProps>) =>
  withOptimizelyProvider(withLiteRedirect(component));

const PageTypeToRender = withFuncs(function PageTypeToRender({
  pageType,
  ...rest
}: PageProps) {
  switch (pageType) {
    case ARTICLE_PAGE:
      return <ArticlePage {...rest} />;
    case MEDIA_ARTICLE_PAGE:
      return <MediaArticlePage {...rest} />;
    default:
      return null;
  }
});

export default PageTypeToRender;

export const getServerSideProps: GetServerSideProps = async context =>
  handleArticleRoute(context);
