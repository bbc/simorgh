import dynamic from 'next/dynamic';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { PageTypes } from '#app/models/types/global';
import withRequestProps from '#utilities/pageRequests/withRequestProps';
import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import { ArticlePageProps } from './types';
import handleArticleRoute from './handleArticleRoute';
import ArticlePageWithOnwardJourneys from './ArticlePageWithOnwardJourneys';

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
      return <ArticlePageWithOnwardJourneys Page={ArticlePage} {...rest} />;
    case MEDIA_ARTICLE_PAGE:
      return (
        <ArticlePageWithOnwardJourneys Page={MediaArticlePage} {...rest} />
      );
    default:
      return null;
  }
});

export default PageTypeToRender;

export const getServerSideProps = withRequestProps(handleArticleRoute);
