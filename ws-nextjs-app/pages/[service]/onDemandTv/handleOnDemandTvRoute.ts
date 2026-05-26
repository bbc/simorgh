import { GetServerSidePropsContext } from 'next';

import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import { NOT_FOUND, OK } from '#app/lib/statusCodes.const';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import isTest from '#app/lib/utilities/isTest';
import PageDataParams from '#app/models/types/pageDataParams';
import handleError from '#app/routes/utils/handleError';
import { TV_PAGE } from '#app/routes/utils/pageTypes';
import parseRoute from '#app/routes/utils/parseRoute';
import nodeLogger from '#lib/logger.node';
import getPageData from '#utilities/pageRequests/getPageData';

const logger = nodeLogger(__filename);

export default async (context: GetServerSidePropsContext) => {
  const { resolvedUrl } = context;
  const { renderer_env: rendererEnv } = context.query as PageDataParams;
  const resolvedUrlWithoutQuery = resolvedUrl.split('?')?.[0];

  const { service, variant } = parseRoute(resolvedUrl);

  if (!service) {
    context.res.statusCode = NOT_FOUND;

    return {
      props: {
        service,
        status: NOT_FOUND,
        timeOnServer: Date.now(),
        variant: variant || null,
        pageType: TV_PAGE,
        pathname: resolvedUrlWithoutQuery,
      },
    };
  }

  const { data } = await getPageData({
    id: resolvedUrlWithoutQuery,
    service,
    variant: variant || undefined,
    rendererEnv: isTest() ? 'live' : rendererEnv,
    resolvedUrl: resolvedUrlWithoutQuery,
    pageType: TV_PAGE,
  });

  const { pageData, status } = data;

  context.res.statusCode = status;

  let routingInfoLogger = logger.debug;

  if (status !== OK) {
    routingInfoLogger = logger.error;

    routingInfoLogger(ROUTING_INFORMATION, {
      url: resolvedUrlWithoutQuery,
      status,
      pageType: TV_PAGE,
    });

    return {
      props: {
        service,
        status,
        timeOnServer: Date.now(),
        variant: variant || null,
        pageType: TV_PAGE,
        pathname: resolvedUrlWithoutQuery,
      },
    };
  }

  if (!pageData) {
    throw handleError('On Demand TV data is malformed', 500);
  }

  const toggles = await getToggles(service);

  // this keeps the recent episodes toggle matching the express route
  const showRecentEpisodes = toggles?.recentVideoEpisodes?.enabled;
  const recentEpisodesLimit = Number(toggles?.recentVideoEpisodes?.value || 4);

  const recentEpisodes =
    showRecentEpisodes && recentEpisodesLimit > 0
      ? (pageData.recentEpisodes?.slice(0, recentEpisodesLimit) ?? null)
      : null;

  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  routingInfoLogger(ROUTING_INFORMATION, {
    url: resolvedUrlWithoutQuery,
    status,
    pageType: TV_PAGE,
  });

  return {
    props: {
      id: resolvedUrlWithoutQuery,
      pageData: {
        ...pageData,
        recentEpisodes,
      },
      pageType: TV_PAGE,
      pathname: resolvedUrlWithoutQuery,
      service,
      status,
      variant: variant || null,
    },
  };
};
