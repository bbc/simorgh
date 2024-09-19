import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { RADIO_MISSING_FIELD, PODCAST_MISSING_FIELD } from '#lib/logger.const';
import getEpisodeAvailability, {
  getUrl,
} from '#lib/utilities/episodeAvailability';
import withRadioSchedule from '#app/routes/utils/withRadioSchedule';
import { InitialDataProps } from '#app/models/types/initialData';
import {
  OnDemandAudioBlock,
  OnDemandMediaModel,
} from '#app/models/types/media';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import getPlaceholderImageUrlUtil from '../../utils/getPlaceholderImageUrl';
import pathWithLogging, {
  LOG_LEVELS,
} from '../../../lib/utilities/logging/pathWithLogging';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import getRadioService from '../../utils/getRadioService';
import processRecentEpisodes from '../../utils/processRecentEpisodes';
import { getPodcastExternalLinks } from '../tempData/podcastExternalLinks';

const getRadioScheduleData = path(['radioScheduleData']);
const getScheduleToggle = path(['onDemandRadioSchedule', 'enabled']);

const getConfig = (pathname: string) => {
  const detailPageType = pathname.includes('podcast')
    ? 'Podcast'
    : 'On Demand Radio';
  const isPodcast = detailPageType === 'Podcast';
  const missingFieldCode = isPodcast
    ? PODCAST_MISSING_FIELD
    : RADIO_MISSING_FIELD;
  const DEFAULT_TOGGLE_VALUE = { enabled: false, value: isPodcast ? 8 : 4 };
  const recentEpisodesKey = isPodcast
    ? 'recentPodcastEpisodes'
    : 'recentAudioEpisodes';
  const getRecentEpisodesToggle = pathOr(DEFAULT_TOGGLE_VALUE, [
    recentEpisodesKey,
  ]);

  return {
    isPodcast,
    missingFieldCode,
    detailPageType,
    getRecentEpisodesToggle,
  };
};

const getPodcastPageIdentifier = (pageIdentifier: string) => {
  const [service, masterbrand, ...rest] = pageIdentifier.split('.');
  return [service, masterbrand, 'podcasts', ...rest].join('.');
};

export default async ({
  path: pathname,
  pageType,
  service,
  toggles,
  variant,
}: InitialDataProps) => {
  try {
    const {
      isPodcast,
      getRecentEpisodesToggle,
      detailPageType,
      missingFieldCode,
    } = getConfig(pathname);

    const radioPodcastDataPath = overrideRendererOnTest(pathname);
    // @ts-expect-error - Ignore fetchPageData argument types
    const pageDataPromise = await fetchPageData({
      path: radioPodcastDataPath,
      pageType,
    });
    const scheduleIsEnabled = getScheduleToggle(toggles);
    const recentEpisodesToggle = getRecentEpisodesToggle(toggles);
    const { enabled: showRecentEpisodes, value: recentEpisodesLimit } =
      recentEpisodesToggle;

    const { json, status } = scheduleIsEnabled
      ? await withRadioSchedule({
          pageDataPromise,
          service,
          path: pathname,
          radioService: getRadioService({ service, pathname }),
        })
      : pageDataPromise;

    const withLogging = pathWithLogging(getUrl(json), missingFieldCode, json);
    const get = (fieldPath: (string | number)[], logLevel?: string) =>
      logLevel ? withLogging(fieldPath, logLevel) : path(fieldPath, json);

    const episodeId = get(['content', 'blocks', 0, 'id'], LOG_LEVELS.ERROR);
    const recentEpisodes = showRecentEpisodes
      ? processRecentEpisodes(json, {
          exclude: episodeId,
          recentEpisodesLimit,
        })
      : [];
    const brandId = isPodcast
      ? get(['metadata', 'locators', 'brandPid'], LOG_LEVELS.ERROR)
      : undefined;

    const pageIdentifier = get([
      'metadata',
      'analyticsLabels',
      'pageIdentifier',
    ]);

    const shortSynopsis = get(
      ['content', 'blocks', 0, 'synopses', 'short'],
      LOG_LEVELS.INFO,
    );
    const mediumSynopsis =
      get(['content', 'blocks', 0, 'synopses', 'medium']) || shortSynopsis;
    const summary = isPodcast ? mediumSynopsis : shortSynopsis;

    const versionId = get(['promo', 'media', 'versions', 0, 'versionId']);

    const externalLinks = isPodcast
      ? await getPodcastExternalLinks(service, brandId, variant, versionId)
      : [];

    const mediaBlocks: OnDemandAudioBlock[] = get(['content', 'blocks']).map(
      (block: OnDemandMediaModel) => {
        return {
          type: 'audio',
          model: { ...block },
        };
      },
    );

    return {
      status,
      pageData: {
        isPodcast,
        metadata: { type: detailPageType },
        language: get(['metadata', 'language'], LOG_LEVELS.INFO),
        brandTitle: get(['metadata', 'title'], LOG_LEVELS.INFO),
        episodeTitle: get(['content', 'blocks', 0, 'episodeTitle']),
        headline: get(['promo', 'headlines', 'headline'], LOG_LEVELS.WARN),
        shortSynopsis: get(['promo', 'media', 'synopses', 'short']),
        id: get(['metadata', 'id']),
        summary,
        contentType: get(
          ['metadata', 'analyticsLabels', 'contentType'],
          LOG_LEVELS.INFO,
        ),
        episodeId,
        brandId,
        masterBrand: get(['metadata', 'createdBy'], LOG_LEVELS.ERROR),
        releaseDateTimeStamp: get(
          ['metadata', 'releaseDateTimeStamp'],
          LOG_LEVELS.WARN,
        ),
        pageTitle: get(['metadata', 'analyticsLabels', 'pageTitle']),
        pageIdentifier: isPodcast
          ? getPodcastPageIdentifier(pageIdentifier)
          : pageIdentifier,
        imageUrl: get(['content', 'blocks', 0, 'imageUrl'], LOG_LEVELS.INFO),
        // An empty string in alt text will not be read out by AT; a null value will use the default alt text from the service config
        imageAltText: isPodcast ? '' : null,
        promoBrandTitle: get(['promo', 'brand', 'title']),
        durationISO8601: get(
          ['promo', 'media', 'versions', 0, 'durationISO8601'],
          LOG_LEVELS.INFO,
        ),
        thumbnailImageUrl: getPlaceholderImageUrlUtil(
          get(['promo', 'media', 'imageUrl'], LOG_LEVELS.INFO),
        ),
        episodeAvailability: getEpisodeAvailability(json),
        radioScheduleData: getRadioScheduleData(json),
        recentEpisodes,
        externalLinks,
        mediaBlocks,
      },
    };
  } catch ({
    message,
    status = getErrorStatusCode(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any | { message: string; status: number }) {
    return { error: message, status };
  }
};
