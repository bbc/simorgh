/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@emotion/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import Heading from '../../../../../src/app/components/Heading';
import Paragragh from '../../../../../src/app/components/Paragraph';
import applyBasicPageHandlers from '../../../../../src/app/pages/utils/applyBasicPageHandlers';
import { Services, Variants } from '../../../../../src/app/models/types/global';
import bffFetch from '../../../../../src/app/routes/article/getInitialData/bffFetch';
import getAgent from '../../../../../src/server/utilities/getAgent';
import { LIVE_PAGE } from '../../../../../src/app/routes/utils/pageTypes';
import getToggles from '../../../../../src/app/lib/utilities/getToggles/withCache';

import styles from './styles';

const getPageData = async (service: Services, id: string) => {
  const data = await bffFetch({
    service,
    path: `live/${id}?renderer_env=live`,
    getAgent,
  });
  const toggles = await getToggles(service);

  return { data, toggles };
};

type ComponentProps = {
  pageData: {
    metadata: string;
  };
  service: Services;
  status: number;
  toggles: Record<string, boolean>;
  variant?: Variants;
};

const LivePage = ({
  pageData,
  service,
  status,
  toggles,
  variant,
}: ComponentProps) => {
  const { asPath } = useRouter();

  const Component = applyBasicPageHandlers({ addVariantHandling: true })(() => (
    <main css={styles.wrapper}>
      <Heading level={1}>Test Next.JS Page</Heading>
      <Paragragh>
        <pre css={styles.code}>
          <ul>
            <li>Service: {service}</li>
            <li>Variant: {variant}</li>
            <li>Path: {asPath}</li>
          </ul>
        </pre>
      </Paragragh>
      <Paragragh>
        <pre css={styles.code}>{JSON.stringify(pageData, null, 2)}</pre>
      </Paragragh>
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
  variant?: Variants;
  id: string;
}

export const getStaticProps: GetStaticProps = async context => {
  const { service, id, variant } = context.params as PageParams;
  const { data, toggles } = await getPageData(service, id);

  return {
    props: {
      pageData: data?.pageData || null,
      service,
      status: data.status,
      toggles,
      variant: variant?.[0] || null,
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
