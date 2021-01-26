import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import getPlaceholderImageUrlUtil from '../../utils/getPlaceholderImageUrl';
import pathWithLogging, {
  LOG_LEVELS,
} from '../../../lib/utilities/logging/pathWithLogging';
import { RADIO_MISSING_FIELD, PODCAST_MISSING_FIELD } from '#lib/logger.const';
import getEpisodeAvailability, {
  getUrl,
} from '#lib/utilities/episodeAvailability';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import withRadioSchedule from '#app/routes/utils/withRadioSchedule';
import getRadioService from '../../utils/getRadioService';
import processRecentEpisodes from '../../utils/processRecentEpisodes';

const getRadioScheduleData = path(['radioScheduleData']);
const getScheduleToggle = path(['onDemandRadioSchedule', 'enabled']);

export default async ({ path: pathname, pageType, service, toggles }) => {
  try {
    const detailPageType = pathname.includes('podcast')
      ? 'Podcast'
      : 'On Demand Radio';
    const isPodcast = detailPageType === 'Podcast';
    const RADIO_PODCAST_MISSING_FIELD = isPodcast
      ? PODCAST_MISSING_FIELD
      : RADIO_MISSING_FIELD;
    const DEFAULT_TOGGLE_VALUE = { enabled: false, value: isPodcast ? 8 : 4 };
    const recentEpisodesKey = isPodcast
      ? 'recentPodcastEpisodes'
      : 'recentAudioEpisodes';
    const getRecentEpisodesToggle = pathOr(DEFAULT_TOGGLE_VALUE, [
      recentEpisodesKey,
    ]);

    const radioPodcastDataPath = overrideRendererOnTest(pathname);
    const pageDataPromise = await fetchPageData({
      path: radioPodcastDataPath,
      pageType,
    });
    const scheduleIsEnabled = getScheduleToggle(toggles);
    const recentEpisodesToggle = getRecentEpisodesToggle(toggles);
    const {
      enabled: showRecentEpisodes,
      value: recentEpisodesLimit,
    } = recentEpisodesToggle;

    const { json, status } = scheduleIsEnabled
      ? await withRadioSchedule({
          pageDataPromise,
          service,
          path: pathname,
          radioService: getRadioService({ service, pathname }),
          pageType: detailPageType.replace(/ /g, ''),
        })
      : await pageDataPromise;

    const withLogging = pathWithLogging(
      getUrl(json),
      RADIO_PODCAST_MISSING_FIELD,
      json,
    );
    const get = (fieldPath, logLevel) =>
      logLevel ? withLogging(fieldPath, logLevel) : path(fieldPath, json);

    const episodeId = get(['content', 'blocks', 0, 'id'], LOG_LEVELS.ERROR);
    const recentEpisodes = showRecentEpisodes
      ? processRecentEpisodes(json, {
          exclude: episodeId,
          recentEpisodesLimit,
        })
      : [];

    return {
      status,
      pageData: {
        metadata: { type: detailPageType },
        language: get(['metadata', 'language'], LOG_LEVELS.INFO),
        brandTitle: get(['metadata', 'title'], LOG_LEVELS.INFO),
        episodeTitle: get(['content', 'blocks', 0, 'title']),
        headline: get(['promo', 'headlines', 'headline'], LOG_LEVELS.WARN),
        shortSynopsis: get(['promo', 'media', 'synopses', 'short']),
        id: get(['metadata', 'id']),
        summary: get(
          ['content', 'blocks', 0, 'synopses', 'short'],
          LOG_LEVELS.INFO,
        ),
        contentType: get(
          ['metadata', 'analyticsLabels', 'contentType'],
          LOG_LEVELS.INFO,
        ),
        episodeId,
        masterBrand: get(['metadata', 'createdBy'], LOG_LEVELS.ERROR),
        releaseDateTimeStamp: get(
          ['metadata', 'releaseDateTimeStamp'],
          LOG_LEVELS.WARN,
        ),
        pageTitle: get(['metadata', 'analyticsLabels', 'pageTitle']),
        pageIdentifier: get(['metadata', 'analyticsLabels', 'pageIdentifier']),
        imageUrl: get(['content', 'blocks', 0, 'imageUrl'], LOG_LEVELS.INFO),
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
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
