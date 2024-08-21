import buildIChefURL from '#lib/utilities/ichefURL';
import filterForBlockType from '#lib/utilities/blockHandlers';
import { getPlaceholderSrcSet } from '#app/lib/utilities/srcSet';
import formatDuration from '#app/lib/utilities/formatDuration';
import moment from 'moment';
import {
  AresMediaBlock,
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
  PlaylistItem,
} from '../types';
import getCaptionBlock from '../utils/getCaptionBlock';

const DEFAULT_WIDTH = 512;
const MIN_DURATION_FOR_PREROLLS = 30;

export default ({
  pageType,
  blocks,
  basePlayerConfig,
  translations,
  adsEnabled = false,
  showAdsBasedOnLocation = false,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const aresMediaBlock: AresMediaBlock = filterForBlockType(
    blocks,
    'aresMedia',
  );

  const { webcastVersions = [] } =
    aresMediaBlock?.model?.blocks?.[0]?.model ?? [];

  const hasWebcastItems = webcastVersions.length > 0;

  const versionParameter = hasWebcastItems ? 'webcastVersions' : 'versions';

  const { originCode, locator } =
    aresMediaBlock?.model?.blocks?.[1]?.model?.blocks?.[0]?.model ?? {};

  const placeholderSrc = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

  const placeholderSrcset = getPlaceholderSrcSet({
    originCode,
    locator,
    isWebP: true,
  });

  const versionID =
    aresMediaBlock?.model?.blocks?.[0]?.model?.[versionParameter]?.[0]
      ?.versionId;

  const format = aresMediaBlock?.model?.blocks?.[0]?.model?.format;

  const actualFormat = format === 'audio_video' ? 'video' : format;

  const rawDuration =
    aresMediaBlock?.model?.blocks?.[0]?.model?.[versionParameter]?.[0]
      ?.duration;
  const duration = moment.duration(rawDuration, 'seconds');
  const durationSpokenPrefix = translations?.media?.duration || 'Duration';

  const title = aresMediaBlock?.model?.blocks?.[0]?.model?.title;

  const captionBlock = getCaptionBlock(blocks, pageType);

  const caption =
    captionBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  const kind =
    aresMediaBlock?.model?.blocks?.[0]?.model?.smpKind || 'programme';

  const guidanceMessage =
    aresMediaBlock?.model?.blocks?.[0]?.model?.[versionParameter]?.[0]?.warnings
      ?.short;

  const isLive = aresMediaBlock?.model?.blocks?.[0]?.model?.live ?? false;

  const mediaInfo = {
    title,
    kind,
    duration: formatDuration({ duration, padMinutes: true }),
    durationSpoken: `${durationSpokenPrefix} ${formatDuration({
      duration,
      separator: ',',
    })}`,
    rawDuration,
    datetime:
      aresMediaBlock?.model?.blocks?.[0]?.model?.[versionParameter]?.[0]
        ?.durationISO8601,
    type: actualFormat || 'video',
    guidanceMessage,
  };

  const allowAdsForVideoDuration = rawDuration >= MIN_DURATION_FOR_PREROLLS;
  const showAds = [
    adsEnabled,
    showAdsBasedOnLocation,
    allowAdsForVideoDuration,
  ].every(Boolean);

  const embeddingAllowed =
    aresMediaBlock?.model?.blocks?.[0]?.model?.embedding ?? false;

  const noJsMessage = `This ${mediaInfo.type} cannot play in your browser. Please enable JavaScript or try a different browser.`;

  const items = [
    { versionID, kind, duration: rawDuration, ...(isLive && { live: true }) },
  ];

  if (showAds) items.unshift({ kind: 'advert' } as PlaylistItem);

  return {
    mediaType: actualFormat || 'video',
    playerConfig: {
      ...basePlayerConfig,
      autoplay: pageType !== 'mediaArticle',
      playlistObject: {
        title,
        summary: caption || '',
        holdingImageURL: placeholderSrc,
        items,
        ...(guidanceMessage && { guidance: guidanceMessage }),
        ...(embeddingAllowed && { embedRights: 'allowed' }),
        ...(isLive && { simulcast: true }),
      },
      ...(pageType === 'mediaArticle' && { preload: 'high' }),
      statsObject: {
        ...basePlayerConfig.statsObject,
        clipPID: versionID,
      },
    },
    placeholderConfig: {
      mediaInfo,
      placeholderSrc,
      placeholderSrcset,
      translatedNoJSMessage: noJsMessage,
    },
    showAds,
  };
};
