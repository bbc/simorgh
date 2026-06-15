import deriveVariant from '#utilities/deriveVariant';
import { GetServerSidePropsContext } from 'next';
import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import PageDataParams from '#app/models/types/pageDataParams';
import { PageTypes } from '#app/models/types/global';
import getPageData from '#utilities/pageRequests/getPageData';
import logResponseTime from '#utilities/logResponseTime';
import { OK } from '#app/lib/statusCodes.const';
import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import handleError from '#app/routes/utils/handleError';

const logger = nodeLogger(__filename);

export default async (context: GetServerSidePropsContext) => {
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

  const { pageData, status } = data;

  let routingInfoLogger = logger.debug;
  if (status !== OK) {
    routingInfoLogger = logger.error;
  }

  if (!pageData) {
    throw handleError('AudioPage data is malformed', 500);
  }

  routingInfoLogger(ROUTING_INFORMATION, {
    url: context.resolvedUrl,
    status,
    pageType: LIVE_TV_PAGE,
  });

  context.res.statusCode = status;

  const baseProps = {
    status,
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
              ...data.pageData.metadata?.atiAnalytics,
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
