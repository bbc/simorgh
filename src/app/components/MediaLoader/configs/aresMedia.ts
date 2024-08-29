import buildIChefURL from '#lib/utilities/ichefURL';
import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  OptimoImageBlock,
  OptimoRawImageBlock,
} from '#app/models/types/optimo';
import {
  AresMediaBlock,
  AresMediaMetadataBlock,
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

  const { model: aresMediaMetadata }: AresMediaMetadataBlock =
    filterForBlockType(aresMediaBlock?.model?.blocks, 'aresMediaMetadata') ??
    {};

  const aresMediaImageBlock: OptimoImageBlock = filterForBlockType(
    aresMediaBlock?.model?.blocks,
    'image',
  );

  const { model: rawImage }: OptimoRawImageBlock =
    filterForBlockType(aresMediaImageBlock?.model?.blocks, 'rawImage') ?? {};

  const { originCode = '', locator = '' } = rawImage ?? {};

  const { webcastVersions = [] } = aresMediaMetadata ?? {};

  const hasWebcastItems = webcastVersions.length > 0;

  const versionParameter = hasWebcastItems ? 'webcastVersions' : 'versions';

  const versionsBlock = aresMediaMetadata?.[versionParameter]?.[0];

  const versionID = versionsBlock?.versionId ?? '';

  const format = aresMediaMetadata?.format;

  const actualFormat = format === 'audio_video' ? 'video' : format;

  const rawDuration = versionsBlock?.duration ?? 0;

  const title = aresMediaMetadata?.title ?? '';

  const captionBlock = getCaptionBlock(blocks, pageType);

  const caption =
    captionBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  const kind = aresMediaMetadata?.smpKind ?? 'programme';

  const guidanceMessage = versionsBlock?.warnings?.short;

  const showAds = shouldDisplayAds({
    adsEnabled,
    showAdsBasedOnLocation,
    duration: rawDuration,
  });

  const embeddingAllowed = aresMediaMetadata?.embedding ?? false;

  const holdingImageURL = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

  const isLive = aresMediaMetadata?.live ?? false;

  const items = [
    { versionID, kind, duration: rawDuration, ...(isLive && { live: true }) },
  ];
  if (showAds) items.unshift({ kind: 'advert' } as PlaylistItem);

  const placeholderConfig = buildPlaceholderConfig({
    title,
    type: actualFormat || 'video',
    duration: rawDuration,
    durationISO8601: versionsBlock?.durationISO8601,
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
