/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@emotion/react';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import Heading from '../../../../../src/app/components/Heading';
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
  bbcOrigin?: string;
  pageData: {
    metadata: string;
  };
  service: Services;
  showAdsBasedOnLocation: boolean;
  status: number;
  toggles: Record<string, boolean>;
  variant?: Variants;
};

const LivePage = ({
  bbcOrigin,
  pageData,
  service,
  showAdsBasedOnLocation,
  status,
  toggles,
  variant,
}: ComponentProps) => {
  const { asPath } = useRouter();

  const Component = applyBasicPageHandlers({ addVariantHandling: true })(() => (
    <main css={styles.wrapper}>
      <Heading level={1}>Test Next.JS Page</Heading>
      <pre css={styles.code}>
        <ul>
          <li>Service: {service}</li>
          <li>Variant: {!variant ? `${service} has no variant` : variant}</li>
          <li>Path: {asPath}</li>
        </ul>
      </pre>
      <pre css={styles.code}>{JSON.stringify(pageData, null, 2)}</pre>
    </main>
  ));

  return (
    <Component
      bbcOrigin={bbcOrigin}
      isNextJs
      isAmp={false}
      service={service}
      showAdsBasedOnLocation={showAdsBasedOnLocation}
      status={status}
      pageData={pageData}
      pageType={LIVE_PAGE}
      pathname={asPath}
      toggles={toggles}
      variant={variant}
    />
  );
};

export default LivePage;

interface PageParams extends ParsedUrlQuery {
  service: Services;
  variant?: Variants;
  id: string;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { service, id, variant } = context.params as PageParams;
  const { data, toggles } = await getPageData(service, id);

  return {
    props: {
      bbcOrigin: context.req.headers['bbc-origin'] || null,
      pageData: data?.pageData || null,
      service,
      showAdsBasedOnLocation:
        context.req.headers['bbc-adverts'] === 'true' || false,
      status: data.status,
      toggles,
      variant: variant?.[0] || null,
    },
  };
};
