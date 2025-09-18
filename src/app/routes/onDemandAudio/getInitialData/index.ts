import { BFF_FETCH_ERROR } from '#lib/logger.const';
import { InitialDataProps } from '#app/models/types/initialData';
import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import overrideRendererOnTest from '#app/routes/utils/overrideRendererOnTest';
import isTest from '#app/lib/utilities/isTest';
import getErrorStatusCode from '#app/routes/utils/fetchPageData/utils/getErrorStatusCode';
import getPodcastExternalLinks from '#app/routes/onDemandAudio/podcastExternalLinks';
import nodeLogger from '#lib/logger.node';

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

export default async ({
  path: pathname,
  pageType,
  service,
  toggles,
  getAgent,
  variant,
}: InitialDataProps) => {
  try {
    const { isPodcast, recentEpisodesToggle } = getConfig(pathname);

    const { json, status } = await fetchDataFromBFF({
      pathname: isTest() ? overrideRendererOnTest(pathname) : pathname,
      pageType,
      service,
      getAgent,
    });

    const { externalLinkVersionId, brandId, recentEpisodes } = json.data;

    // @ts-expect-error lookup toggle by name
    const { enabled: scheduleIsEnabled } = toggles.onDemandRadioSchedule;

    const { enabled: showRecentEpisodes, value: recentEpisodesLimit } =
      // @ts-expect-error lookup toggle by name
      toggles[recentEpisodesToggle];

    const externalLinks = isPodcast
      ? await getPodcastExternalLinks({
          service,
          variant,
          brandId,
          versionId: externalLinkVersionId,
        })
      : [];
    return {
      status,
      pageData: {
        ...json.data,
        externalLinks,
        ...(!scheduleIsEnabled && { radioScheduleData: null }),
        ...(showRecentEpisodes
          ? { recentEpisodes: recentEpisodes.slice(0, recentEpisodesLimit) }
          : { recentEpisodes: null }),
      },
    };
  } catch ({ message, status = getErrorStatusCode() }: any) {
    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });
    return { error: message, status };
  }
};
