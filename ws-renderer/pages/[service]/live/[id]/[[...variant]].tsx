/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@emotion/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import Heading from '../../../../../src/app/components/Heading';
import applyBasicPageHandlers from '../../../../../src/app/pages/utils/applyBasicPageHandlers';
import withOptimizelyProvider from '../../../../../src/app/legacy/containers/PageHandlers/withOptimizelyProvider';
import { Services, Variants } from '../../../../../src/app/models/types/global';
import bffFetch from '../../../../../src/app/routes/article/getInitialData/bffFetch';
import getAgent from '../../../../../src/server/utilities/getAgent';
import ArticlePage from '../../../../../src/app/pages/ArticlePage/ArticlePage';
import { LIVE_PAGE } from '../../../../../src/app/routes/utils/pageTypes';
import getToggles from '../../../../../src/app/lib/utilities/getToggles/withCache';

import styles from './styles';

const getPageData = async (service: Services, id: string) => {
  const data = await bffFetch({
    service,
    path: `live/${id}?renderer_env=live`,
    getAgent,
  });

  return data;
};

type ComponentProps = {
  pageData: {
    metadata: string;
  };
  service: Services;
  variant?: Variants;
  status: number;
  toggles: Record<string, boolean>;
};

const LivePage = ({
  pageData,
  status,
  service,
  variant,
  toggles,
}: ComponentProps) => {
  const { asPath } = useRouter();
  const OptimizelyArticle = withOptimizelyProvider(ArticlePage);

  const Component = applyBasicPageHandlers({ addVariantHandling: true })(() => (
    <main css={styles.wrapper}>
      <Heading level={1}>Test Next.JS Page</Heading>
      <OptimizelyArticle pageData={pageData} />
    </main>
  ));

  return (
    <Component
      status={status}
      service={service}
      variant={variant}
      pageData={pageData}
      pageType={LIVE_PAGE}
      pathname={asPath}
      isNextJs
      isAmp={false}
      toggles={toggles}
    />
  );
};

export default LivePage;

interface PageParams extends ParsedUrlQuery {
  service: Services;
  id: string;
}

export const getStaticProps: GetStaticProps = async context => {
  const { service, id, variant } = context.params as PageParams;
  const response = await getPageData(service, id);
  const toggles = await getToggles(service);

  return {
    props: {
      status: response.status,
      pageData: response?.pageData || null,
      service,
      variant: variant?.[0] || null,
      toggles,
    },
    revalidate: 60,
  };
};

// TODO: revisit https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
