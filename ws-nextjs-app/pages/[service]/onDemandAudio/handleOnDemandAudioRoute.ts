import { GetServerSidePropsContext } from 'next';
import { AUDIO_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import parseRoute from '#app/routes/utils/parseRoute';
import { NOT_FOUND, OK } from '#app/lib/statusCodes.const';
import getPageData from '#nextjs/utilities/pageRequests/getPageData';
import nodeLogger from '#lib/logger.node';
import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import handleError from '#app/routes/utils/handleError';
import getPodcastExternalLinks from '#app/routes/onDemandAudio/podcastExternalLinks';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import isTest from '#app/lib/utilities/isTest';

const logger = nodeLogger(__filename);

const getConfig = (pathname: string) => {
  const isPodcast = pathname.includes('podcast');
  const recentEpisodesToggle = isPodcast
    ? 'recentPodcastEpisodes'
    : 'recentAudioEpisodes';

  return {
    isPodcast,
    recentEpisodesToggle,
  };
};

export default async (context: GetServerSidePropsContext) => {
  const { resolvedUrl } = context;
  const { renderer_env: rendererEnv } = context.query as PageDataParams;

  const { isPodcast, recentEpisodesToggle } = getConfig(resolvedUrl);

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
        pageType: AUDIO_PAGE,
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
    pageType: AUDIO_PAGE,
  });

  const { pageData, status } = data;

  context.res.statusCode = status;

  let routingInfoLogger = logger.debug;

  if (status !== OK) {
    routingInfoLogger = logger.error;

    routingInfoLogger(ROUTING_INFORMATION, {
      url: resolvedUrlWithoutQuery,
      status,
      pageType: AUDIO_PAGE,
    });

    return {
      props: {
        service,
        status,
        timeOnServer: Date.now(),
        variant: variant || null,
        pageType: AUDIO_PAGE,
        pathname: resolvedUrlWithoutQuery,
      },
    };
  }

  if (!pageData) {
    throw handleError('AudioPage data is malformed', 500);
  }

  const toggles = await getToggles(service);

  const { externalLinkVersionId, brandId, recentEpisodes } = pageData;
  const { enabled: scheduleIsEnabled } = toggles.onDemandRadioSchedule;

  const { enabled: showRecentEpisodes, value: recentEpisodesLimit } =
    toggles[recentEpisodesToggle];

  const externalLinks = isPodcast
    ? await getPodcastExternalLinks({
        service,
        variant: variant || undefined,
        brandId,
        versionId: externalLinkVersionId,
      })
    : [];

  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=600, stale-while-revalidate=240, max-age=180',
  );

  routingInfoLogger(ROUTING_INFORMATION, {
    url: resolvedUrlWithoutQuery,
    status,
    pageType: AUDIO_PAGE,
  });

  return {
    props: {
      id: resolvedUrlWithoutQuery,
      pageData: {
        ...pageData,
        externalLinks,
        ...(!scheduleIsEnabled && { radioScheduleData: null }),
        ...(showRecentEpisodes
          ? { recentEpisodes: recentEpisodes?.slice(0, recentEpisodesLimit) }
          : { recentEpisodes: null }),
      },
      pageType: AUDIO_PAGE,
      pathname: resolvedUrlWithoutQuery,
      service,
      status,
      variant: variant || null,
    },
  };
};
