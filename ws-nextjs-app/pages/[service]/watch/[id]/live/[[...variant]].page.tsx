import deriveVariant from '#nextjs/utilities/deriveVariant';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import PageDataParams from '#app/models/types/pageDataParams';
import { PageTypes } from '#app/models/types/global';
import getPageData from '#nextjs/utilities/pageRequests/getPageData';
import logResponseTime from '#src/server/utilities/logResponseTime';
import { OK } from '#app/lib/statusCodes.const';
import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import extractHeaders from '#src/server/utilities/extractHeaders';

const LiveTvLayout = dynamic(() => import('./LiveTvPageLayout'));

const logger = nodeLogger(__filename);

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  logResponseTime(
    {
      path: context.resolvedUrl,
    },
    context.res,
    () => null,
  );

  const {
    id,
    service,
    renderer_env: rendererEnv,
    variant: variantFromUrl,
  } = context.query as PageDataParams;

  const variant = deriveVariant(variantFromUrl);

  const { headers: reqHeaders } = context.req;

  const { data, toggles } = await getPageData({
    id,
    service,
    rendererEnv,
    variant,
    resolvedUrl: context.resolvedUrl,
    pageType: LIVE_TV_PAGE,
  });

  let routingInfoLogger = logger.debug;
  if (data.status !== OK) {
    routingInfoLogger = logger.error;
  }

  routingInfoLogger(ROUTING_INFORMATION, {
    url: context.resolvedUrl,
    status: data.status,
    pageType: LIVE_TV_PAGE,
  });

  context.res.statusCode = data.status;

  const baseProps = {
    isNextJs: true,
    status: data.status,
    pageType: LIVE_TV_PAGE as PageTypes,
    id,
    service,
    toggles,
    pageData: data?.pageData
      ? {
          ...data.pageData,
          metadata: {
            ...data.pageData.metadata,
            type: LIVE_TV_PAGE,
            atiAnalytics: {},
          },
        }
      : null,
    pathname: context?.resolvedUrl,
    ...extractHeaders(reqHeaders),
  };
  return {
    props: {
      ...baseProps,
    },
  };
};

export default LiveTvLayout;

