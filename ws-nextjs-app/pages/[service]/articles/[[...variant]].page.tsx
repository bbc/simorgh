import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { PageTypes } from '#app/models/types/global';
import { ArticlePageProps } from './types';
import handleArticleRoute from './handleArticleRoute';

const ArticlePage = dynamic(() => import('#app/pages/ArticlePage/ArticlePage'));
const MediaArticlePage = dynamic(
  () => import('#app/pages/MediaArticlePage/MediaArticlePage'),
);

type PageProps = {
  pageType?: PageTypes;
} & ArticlePageProps;

export default function PageTypeToRender({ pageType, ...rest }: PageProps) {
  switch (pageType) {
    // Article Pages (Optimo)
    case ARTICLE_PAGE:
      return <ArticlePage {...rest} />;
    // Media Article Pages (Optimo)
    case MEDIA_ARTICLE_PAGE:
      return <MediaArticlePage {...rest} />;
    default:
      // Return nothing, 404 is handled in _app.tsx
      return null;
  }
}

export const getServerSideProps: GetServerSideProps = async context =>
  handleArticleRoute(context);
