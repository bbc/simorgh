import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { OFFLINE_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#utilities/deriveVariant';
import extractHeaders from '#utilities/extractHeaders';
import logResponseTime from '#utilities/logResponseTime';

const OfflinePage = dynamic(() => import('./OfflinePage'));

export const getServerSideProps: GetServerSideProps = async context => {
  const { service, variant: variantFromUrl } = context.query as PageDataParams;
  const variant = deriveVariant(variantFromUrl);

  logResponseTime({ path: context.resolvedUrl }, context.res, () => null);

  context.res.setHeader(
    'Cache-Control',
    'public, max-age=300, stale-while-revalidate=600, stale-if-error=3600',
  );

  return {
    props: {
      service,
      variant,
      pageType: OFFLINE_PAGE,
      status: 200,
      timeOnServer: Date.now(),
      pathname: `/${service}/offline`,
      ...extractHeaders(context.req.headers),
      pageData: {
        metadata: {
          type: OFFLINE_PAGE,
        },
      },
    },
  };
};

export default OfflinePage;
