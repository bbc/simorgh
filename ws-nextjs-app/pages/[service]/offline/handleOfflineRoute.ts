import { GetServerSidePropsContext } from 'next';
import { OFFLINE_PAGE } from '#app/routes/utils/pageTypes';
import parseRoute from '#app/routes/utils/parseRoute';
import logResponseTime from '#utilities/logResponseTime';

export default async (context: GetServerSidePropsContext) => {
  const { resolvedUrl } = context;

  const resolvedUrlWithoutQuery = resolvedUrl.split('?')?.[0];

  const { service, variant } = parseRoute(resolvedUrl);

  logResponseTime({ path: resolvedUrl }, context.res, () => null);

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
      pathname: resolvedUrlWithoutQuery,
      pageData: {
        metadata: {
          type: OFFLINE_PAGE,
        },
      },
    },
  };
};
