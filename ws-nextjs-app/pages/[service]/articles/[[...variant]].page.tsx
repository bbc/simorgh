import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import { PageTypes } from '#app/models/types/global';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import handleArticleRoute from './handleArticleRoute';
import { ArticlePageProps } from './types';

const ArticlePage = dynamic(() => import('#app/pages/ArticlePage/ArticlePage'));
const MediaArticlePage = dynamic(
  () => import('#app/pages/MediaArticlePage/MediaArticlePage'),
);

type PageProps = {
  pageType?: PageTypes;
} & ArticlePageProps;

const PageTypeToRender = withOptimizelyProvider(function PageTypeToRender({
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
