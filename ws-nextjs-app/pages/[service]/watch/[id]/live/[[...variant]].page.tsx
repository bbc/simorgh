import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import { OK } from '#app/lib/statusCodes.const';
import { PageTypes } from '#app/models/types/global';
import PageDataParams from '#app/models/types/pageDataParams';
import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import deriveVariant from '#utilities/deriveVariant';
import logResponseTime from '#utilities/logResponseTime';
import getPageData from '#utilities/pageRequests/getPageData';

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

  const { data } = await getPageData({
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
    status: data.status,
    pageType: LIVE_TV_PAGE as PageTypes,
    id,
    service,
    pageData: data?.pageData
      ? {
          ...data.pageData,
          metadata: {
            ...data.pageData.metadata,
            type: LIVE_TV_PAGE,
            atiAnalytics: {
              ...data.pageData.metadata.atiAnalytics,
              contentType: 'player-live',
              pageIdentifier: `${service}.${id}.livetv.page`,
            },
          },
        }
      : null,
    pathname: context?.resolvedUrl,
  };
  return {
    props: {
      ...baseProps,
    },
  };
};

export default LiveTvLayout;
