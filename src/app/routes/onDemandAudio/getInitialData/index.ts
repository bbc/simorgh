import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { BFF_FETCH_ERROR } from '#lib/logger.const';
import { InitialDataProps } from '#app/models/types/initialData';
import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import overrideRendererOnTest from '#app/routes/utils/overrideRendererOnTest';
import isTest from '#app/lib/utilities/isTest';
import getErrorStatusCode from '#app/routes/utils/fetchPageData/utils/getErrorStatusCode';
import { getPodcastExternalLinks } from '#app/routes/onDemandAudio/tempData/podcastExternalLinks';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);
const getScheduleToggle = path(['onDemandRadioSchedule', 'enabled']);

const getConfig = (pathname: string) => {
  const isPodcast = pathname.includes('podcast');
  const DEFAULT_TOGGLE_VALUE = { enabled: false, value: isPodcast ? 8 : 4 };
  const recentEpisodesKey = isPodcast
    ? 'recentPodcastEpisodes'
    : 'recentAudioEpisodes';
  const getRecentEpisodesToggle = pathOr(DEFAULT_TOGGLE_VALUE, [
    recentEpisodesKey,
  ]);

  return {
    isPodcast,
    getRecentEpisodesToggle,
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
    const { isPodcast, getRecentEpisodesToggle } = getConfig(pathname);

    const { json, status } = await fetchDataFromBFF({
      pathname: isTest() ? overrideRendererOnTest(pathname) : pathname,
      pageType,
      service,
      getAgent,
    });

    const { externalLinkVersionId, brandId, recentEpisodes } = json.data;

    const scheduleIsEnabled = getScheduleToggle(toggles);

    const recentEpisodesToggle = getRecentEpisodesToggle(toggles);

    const { enabled: showRecentEpisodes, value: recentEpisodesLimit } =
      recentEpisodesToggle;

    const externalLinks = isPodcast
      ? await getPodcastExternalLinks(
          service,
          brandId,
          externalLinkVersionId,
          variant,
        )
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
  } catch ({
    message,
    status = getErrorStatusCode(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any | { message: string; status: number }) {
    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });
    return { error: message, status };
  }
};
