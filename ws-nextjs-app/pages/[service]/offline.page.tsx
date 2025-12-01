import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { OFFLINE_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import extractHeaders from '#server/utilities/extractHeaders';
import logResponseTime from '#server/utilities/logResponseTime';
import getToggles from '#app/lib/utilities/getToggles/withCache';

const OfflinePage = dynamic(() => import('./offline/OfflinePage'));

export const getServerSideProps: GetServerSideProps = async context => {
  const { service, variant: variantFromUrl } = context.query as PageDataParams;
  const variant = deriveVariant(variantFromUrl);

  logResponseTime({ path: context.resolvedUrl }, context.res, () => null);

  // Set cache headers for offline page - cache aggressively since content is static
  context.res.setHeader(
    'Cache-Control',
    'public, max-age=300, stale-while-revalidate=600, stale-if-error=3600',
  );

  const toggles = await getToggles(service);

  return {
    props: {
      service,
      variant,
      toggles,
      pageType: OFFLINE_PAGE,
      isNextJs: true,
      isAmp: false,
      status: 200,
      timeOnServer: Date.now(),
      pathname: `/${service}/offline`,
      ...extractHeaders(context.req.headers),
    },
  };
};

export default function OfflinePageRoute() {
  return <OfflinePage />;
}
