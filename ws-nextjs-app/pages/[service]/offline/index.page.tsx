import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { OFFLINE_PAGE, MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import logResponseTime from '#server/utilities/logResponseTime';
import getPageData from '#nextjs/utilities/pageRequests/getPageData';
import extractHeaders from '#src/server/utilities/extractHeaders';

const OfflinePage = dynamic(() => import('./OfflinePage'));

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    service,
    variant: variantFromUrl,
    renderer_env: rendererEnv,
  } = context.query as PageDataParams;
  const variant = deriveVariant(variantFromUrl);

  logResponseTime({ path: context.resolvedUrl }, context.res, () => null);

  context.res.setHeader(
    'Cache-Control',
    'public, max-age=300, stale-while-revalidate=600, stale-if-error=3600',
  );

  let mostReadData = null;

  try {
    const { data } = await getPageData({
      pageType: MOST_READ_PAGE,
      id: `/${service}/popular/read`,
      resolvedUrl: `/${service}/popular/read`,
      service,
      variant: variant || undefined,
      rendererEnv: rendererEnv || 'live',
    });

    mostReadData = data?.pageData ?? null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch most read data:', err);
  }

  return {
    props: {
      pageData: {
        mostReadData,
      },
      pageType: OFFLINE_PAGE,
      service,
      status: 200,
      variant: variant || null,
      timeOnServer: Date.now(),
      pathname: `/${service}/offline`,
      ...extractHeaders(context.req.headers),
    },
  };
};

export default OfflinePage;
