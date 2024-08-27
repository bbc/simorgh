import buildIChefURL from '#lib/utilities/ichefURL';
import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  AresMediaBlock,
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
  PlaylistItem,
} from '../types';
import getCaptionBlock from '../utils/getCaptionBlock';
import buildPlaceholderConfig from '../utils/buildPlaceholderConfig';
import shouldDisplayAds from '../utils/shouldDisplayAds';

const DEFAULT_WIDTH = 512;

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

  const versionID =
    aresMediaBlock?.model?.blocks?.[0]?.model?.[versionParameter]?.[0]
      ?.versionId;

  const format = aresMediaBlock?.model?.blocks?.[0]?.model?.format;

  const actualFormat = format === 'audio_video' ? 'video' : format;

  const rawDuration =
    aresMediaBlock?.model?.blocks?.[0]?.model?.[versionParameter]?.[0]
      ?.duration;

  const title = aresMediaBlock?.model?.blocks?.[0]?.model?.title;

  const captionBlock = getCaptionBlock(blocks, pageType);

  const caption =
    captionBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  const kind =
    aresMediaBlock?.model?.blocks?.[0]?.model?.smpKind || 'programme';

  const guidanceMessage =
    aresMediaBlock?.model?.blocks?.[0]?.model?.[versionParameter]?.[0]?.warnings
      ?.short;

  const showAds = shouldDisplayAds({
    adsEnabled,
    showAdsBasedOnLocation,
    duration: rawDuration,
  });

  const embeddingAllowed =
    aresMediaBlock?.model?.blocks?.[0]?.model?.embedding ?? false;

  const holdingImageURL = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

  const isLive = aresMediaBlock?.model?.blocks?.[0]?.model?.live ?? false;

  const items = [
    { versionID, kind, duration: rawDuration, ...(isLive && { live: true }) },
  ];
  if (showAds) items.unshift({ kind: 'advert' } as PlaylistItem);

  const placeholderConfig = buildPlaceholderConfig({
    title,
    type: actualFormat || 'video',
    duration: rawDuration,
    durationISO8601:
      aresMediaBlock?.model?.blocks?.[0]?.model?.[versionParameter]?.[0]
        ?.durationISO8601,
    guidanceMessage,
    holdingImageURL,
    translations,
    placeholderImageOriginCode: originCode,
    placeholderImageLocator: locator,
  });

  return {
    mediaType: actualFormat || 'video',
    playerConfig: {
      ...basePlayerConfig,
      autoplay: pageType !== 'mediaArticle',
      playlistObject: {
        title,
        summary: caption || '',
        holdingImageURL,
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
    placeholderConfig,
    showAds,
  };
};
