import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { PageTypes } from '#app/models/types/global';
import PageDataParams from '#app/models/types/pageDataParams';
import { Article } from '#app/models/types/optimo';
import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import { NOT_FOUND, OK } from '#app/lib/statusCodes.const';
import handleArticleRoute from '../articles/handleArticleRoute';

const ArticlePage = dynamic(() => import('#app/pages/ArticlePage/ArticlePage'));
const MediaArticlePage = dynamic(
  () => import('#app/pages/MediaArticlePage/MediaArticlePage'),
);

type PageProps = {
  pageType?: PageTypes;
  pageData: Article;
  openVideoModal?: boolean;
  watchArticlePath?: string | null;
};

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

const optimoArticleIdRegex = /^c[a-zA-Z0-9]{10,}o$/;

const getArticlePath = ({
  service,
  id,
  variant,
}: {
  service: string;
  id: string;
  variant?: string | string[];
}) => {
  const [variantPath] = Array.isArray(variant) ? variant : [variant];

  return `/${service}/articles/${id}${variantPath ? `/${variantPath}` : ''}`;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { service, id, variant } = context.query as PageDataParams;
  const watchPath = context.resolvedUrl.split('?')?.[0];

  if (service !== 'hindi' || !id || !optimoArticleIdRegex.test(id)) {
    context.res.statusCode = NOT_FOUND;

    return {
      props: {
        pageType: ARTICLE_PAGE,
        pathname: watchPath,
        service,
        status: NOT_FOUND,
        timeOnServer: Date.now(),
        variant: null,
      },
    };
  }

  const articlePath = getArticlePath({ service, id, variant });
  const result = await handleArticleRoute({
    ...context,
    resolvedUrl: articlePath,
    query: {
      ...context.query,
      service,
    },
  });

  if (!('props' in result)) return result;

  const props = await result.props;
  const status = props?.status;

  return {
    props: {
      ...props,
      id: articlePath,
      openVideoModal: status === OK,
      pathname: watchPath,
      watchArticlePath: articlePath,
    },
  };
};

export default PageTypeToRender;
