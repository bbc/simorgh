import { LIVE_RADIO_PAGE } from '#app/routes/utils/pageTypes';
import { ROUTING_INFORMATION } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
import { GetServerSidePropsContext } from 'next';
import PageDataParams from '#app/models/types/pageDataParams';
import parseRoute from '#app/routes/utils/parseRoute';
import { NOT_FOUND, OK } from '#app/lib/statusCodes.const';
import getPageData from '#nextjs/utilities/pageRequests/getPageData';
import handleError from '#app/routes/utils/handleError';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import isTest from '#app/lib/utilities/isTest';

const logger = nodeLogger(__filename);

export default async (context: GetServerSidePropsContext) => {
  const { resolvedUrl } = context;
  const { renderer_env: rendererEnv } = context.query as PageDataParams;

  const resolvedUrlWithoutQuery = resolvedUrl.split('?')?.[0];

  const { service, variant } = parseRoute(resolvedUrl);

  const toggles = await getToggles(service);
  const { enabled: scheduleIsEnabled } = toggles.liveRadioSchedule;
  const disableRadioSchedule = !scheduleIsEnabled;

  if (!service) {
    context.res.statusCode = NOT_FOUND;

    return {
      props: {
        service,
        status: NOT_FOUND,
        timeOnServer: Date.now(),
        variant: variant || null,
        pageType: LIVE_RADIO_PAGE,
        pathname: resolvedUrlWithoutQuery,
      },
    };
  }

  const { data } = await getPageData({
    id: resolvedUrlWithoutQuery,
    service,
    variant: variant || undefined,
    rendererEnv,
    resolvedUrl: resolvedUrlWithoutQuery,
    pageType: LIVE_RADIO_PAGE,
    disableRadioSchedule,
  });

  const { pageData, status } = data;

  context.res.statusCode = status;

  let routingInfoLogger = logger.debug;

  if (status !== OK) {
    routingInfoLogger = logger.error;

    routingInfoLogger(ROUTING_INFORMATION, {
      url: resolvedUrlWithoutQuery,
      status,
      pageType: LIVE_RADIO_PAGE,
    });

    return {
      props: {
        service,
        status,
        timeOnServer: Date.now(),
        variant: variant || null,
        pageType: LIVE_RADIO_PAGE,
        pathname: resolvedUrlWithoutQuery,
      },
    };
  }

  if (!pageData) {
    throw handleError('LiveRadioPage data is malformed', 500);
  }

  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  routingInfoLogger(ROUTING_INFORMATION, {
    url: resolvedUrlWithoutQuery,
    status,
    pageType: LIVE_RADIO_PAGE,
  });

  return {
    props: {
      id: resolvedUrlWithoutQuery,
      pageData,
      pageType: LIVE_RADIO_PAGE,
      pathname: resolvedUrlWithoutQuery,
      service,
      status,
      variant: variant || null,
    },
  };
};
