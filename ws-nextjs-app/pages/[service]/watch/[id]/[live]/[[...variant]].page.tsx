import deriveVariant from '#utilities/deriveVariant';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import PageDataParams from '#app/models/types/pageDataParams';
import { PageTypes } from '#app/models/types/global';
import getPageData from '#utilities/pageRequests/getPageData';
import logResponseTime from '#utilities/logResponseTime';
import { NOT_FOUND, OK } from '#app/lib/statusCodes.const';
import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import { variants } from '#app/lib/utilities/variantHandler';

const LiveTvLayout = dynamic(() => import('./LiveTvPageLayout'));

const logger = nodeLogger(__filename);

const isValidRoute = (resolvedUrl: string) => {
  const suffixAllowList = ['live', 'live.app'];
  const variantSuffixAllowList = variants.flatMap(variant => [
    `${variant}`,
    `${variant}.app`,
  ]);

  const slugsReversed = resolvedUrl.split('?')?.[0].split('/').reverse();
  const lastSlug = slugsReversed[0];
  const penultimateSlug = slugsReversed[1];

  // Check for standard routes
  if (suffixAllowList.includes(lastSlug)) {
    return true;
  }

  // Check for variant routes
  if (penultimateSlug === 'live' && variantSuffixAllowList.includes(lastSlug)) {
    return true;
  }

  return false;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  let routingInfoLogger = logger.debug;
  const { resolvedUrl } = context;
  const {
    id,
    service,
    renderer_env: rendererEnv,
    variant: variantFromUrl,
  } = context.query as PageDataParams;

  if (!isValidRoute(resolvedUrl)) {
    routingInfoLogger(ROUTING_INFORMATION, {
      url: resolvedUrl,
      status: NOT_FOUND,
      pageType: LIVE_TV_PAGE,
    });

    context.res.statusCode = NOT_FOUND;

    return {
      props: {
        service,
        status: NOT_FOUND,
        timeOnServer: Date.now(),
        variant: variantFromUrl || null,
        pageType: LIVE_TV_PAGE,
        pathname: resolvedUrl,
      },
    };
  }

  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  logResponseTime(
    {
      path: resolvedUrl,
    },
    context.res,
    () => null,
  );

  const variant = deriveVariant(variantFromUrl);

  const { data } = await getPageData({
    id,
    service,
    rendererEnv,
    variant,
    resolvedUrl,
    pageType: LIVE_TV_PAGE,
  });

  if (data.status !== OK) {
    routingInfoLogger = logger.error;
  }

  routingInfoLogger(ROUTING_INFORMATION, {
    url: resolvedUrl,
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
              ...data.pageData.metadata?.atiAnalytics,
              contentType: 'player-live',
              pageIdentifier: `${service}.${id}.livetv.page`,
            },
          },
        }
      : null,
    pathname: resolvedUrl,
  };
  return {
    props: {
      ...baseProps,
    },
  };
};

export default LiveTvLayout;
