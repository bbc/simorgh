import { LIVE_RADIO_PAGE } from '#app/routes/utils/pageTypes';
import { ROUTING_INFORMATION } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
// to sort
import { GetServerSidePropsContext } from 'next';
import PageDataParams from '#app/models/types/pageDataParams';
import parseRoute from '#app/routes/utils/parseRoute';
import { NOT_FOUND, OK } from '#app/lib/statusCodes.const';
import getPageData from '#nextjs/utilities/pageRequests/getPageData';
import handleError from '#app/routes/utils/handleError';
// import getToggles from '#app/lib/utilities/getToggles/withCache';
import isTest from '#app/lib/utilities/isTest';

const logger = nodeLogger(__filename);

// export default async ({ path: pathname, service, toggles, getAgent }) => {
export default async (context: GetServerSidePropsContext) => {
  // new
  const { resolvedUrl } = context;
  // new
  const { renderer_env: rendererEnv } = context.query as PageDataParams;

  // TODO - check toggle implementation in other opage types
  //   const { liveRadioSchedule } = getConfig(resolvedUrl);
  //   // moved
  //       const { enabled: scheduleIsEnabled } = toggles.liveRadioSchedule;
  //   const disableRadioSchedule = !scheduleIsEnabled;

  // new
  const resolvedUrlWithoutQuery = resolvedUrl.split('?')?.[0];

  // new
  const { service, variant } = parseRoute(resolvedUrl);

  console.log('resolvedUrlWithoutQuery HELLO', resolvedUrlWithoutQuery);
  // new
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

  // props
  //     pathname,
  //   service,
  //   pageType: LIVE_RADIO_PAGE,
  //   getAgent,
  //   disableRadioSchedule,
  const { data } = await getPageData({
    id: resolvedUrlWithoutQuery,
    service,
    variant: variant || undefined,
    rendererEnv: isTest() ? 'live' : rendererEnv, // check if required
    resolvedUrl: resolvedUrlWithoutQuery,
    pageType: LIVE_RADIO_PAGE,
  });

  // new
  const { pageData, status } = data;

  // all new until
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

  // TODO - toggles
  //   const toggles = await getToggles(service);

  // TODO - toggles
  //   const { externalLinkVersionId, brandId, recentEpisodes } = pageData;
  //   const { enabled: scheduleIsEnabled } = toggles.onDemandRadioSchedule;

  //   const { enabled: showRecentEpisodes, value: recentEpisodesLimit } =
  //     toggles[recentEpisodesToggle];

  // new
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  // new
  routingInfoLogger(ROUTING_INFORMATION, {
    url: resolvedUrlWithoutQuery,
    status,
    pageType: LIVE_RADIO_PAGE,
  });

  return {
    props: {
      id: resolvedUrlWithoutQuery,
      pageData: {
        ...pageData,
      },
      pageType: LIVE_RADIO_PAGE,
      pathname: resolvedUrlWithoutQuery,
      service,
      status,
      variant: variant || null,
    },
  };
};

//     return {
//       status,
//       pageData,
//     };
//   } catch ({ message, status = getErrorStatusCode() }) {
//     logger.error(BFF_FETCH_ERROR, {
//       service,
//       status,
//       pathname,
//       message,
//     });

//     return { error: message, status };
//   }
// };
