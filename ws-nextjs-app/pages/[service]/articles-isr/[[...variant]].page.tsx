import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { PageTypes } from '#app/models/types/global';
import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import { ArticlePageProps } from '../articles/types';
import handleArticleRouteStatic from './handleArticleRouteStatic';

const ARTICLE_ID_REGEX = /c[a-zA-Z0-9]{10,}o/g;

const ArticlePage = dynamic(() => import('#app/pages/ArticlePage/ArticlePage'));
const MediaArticlePage = dynamic(
  () => import('#app/pages/MediaArticlePage/MediaArticlePage'),
);

type PageProps = {
  pageType?: PageTypes;
} & ArticlePageProps;

const parseRolloutServices = () => {
  return (process.env.SIMORGH_ISR_ROLLOUT_SERVICES || '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);
};

const extractArticleIds = (input: unknown) => {
  const stringifiedInput = JSON.stringify(input);
  const matches = stringifiedInput.match(ARTICLE_ID_REGEX) || [];

  return [...new Set(matches)];
};

const buildMostReadUrl = (service: string) => {
  const cdnBaseUrl = process.env.SIMORGH_MOST_READ_CDN_URL;

  if (!cdnBaseUrl) {
    return null;
  }

  return `${cdnBaseUrl}/most/read/${service}`;
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

export default PageTypeToRender;

export const getStaticProps: GetStaticProps = async context => {
  return handleArticleRouteStatic(context);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const services = parseRolloutServices();

  const paths: Array<{ params: { service: string; variant: string[] } }> = [];

  await Promise.all(
    services.map(async service => {
      const mostReadUrl = buildMostReadUrl(service);

      if (!mostReadUrl) {
        return;
      }

      try {
        const response = await fetch(mostReadUrl);

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        const articleIds = extractArticleIds(data).slice(0, 10);

        articleIds.forEach(articleId => {
          paths.push({
            params: {
              service,
              variant: [articleId],
            },
          });
        });
      } catch (_error) {
        // Keep build resilient: fallback:'blocking' covers runtime generation.
      }
    }),
  );

  return {
    paths,
    fallback: 'blocking',
  };
};
