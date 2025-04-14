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
  Orientations,
  PlaylistItem,
} from '../types';
import getCaptionBlock from '../utils/getCaptionBlock';
import buildPlaceholderConfig from '../utils/buildPlaceholderConfig';
import shouldDisplayAds from '../utils/shouldDisplayAds';
import { getAmpIframeUrl, getExternalEmbedUrl } from '../utils/urlConstructors';

const DEFAULT_WIDTH = 512;

const ORIENTATION_MAPPING: Record<string, Orientations> = {
  Portrait: 'portrait',
  Original: 'landscape',
};

export default ({
  id,
  pageType,
  blocks,
  basePlayerConfig,
  translations,
  adsEnabled = false,
  showAdsBasedOnLocation = false,
  embedded,
  lang,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model: aresMedia }: AresMediaBlock =
    filterForBlockType(blocks, 'aresMedia') ?? {};

  const { model: aresMediaMetadata }: AresMediaMetadataBlock =
    filterForBlockType(aresMedia?.blocks, 'aresMediaMetadata') ?? {};

  const { model: aresMediaImage }: OptimoImageBlock =
    filterForBlockType(aresMedia?.blocks, 'image') ?? {};

  const { model: rawImage }: OptimoRawImageBlock =
    filterForBlockType(aresMediaImage?.blocks, 'rawImage') ?? {};

  const { originCode = '', locator = '' } = rawImage ?? {};

  const { webcastVersions = [] } = aresMediaMetadata ?? {};

  const hasWebcastItems = webcastVersions.length > 0;

  const versionParameter = hasWebcastItems ? 'webcastVersions' : 'versions';

  const versionsBlock = aresMediaMetadata?.[versionParameter]?.[0];

  // Referred to as 'vPID' or 'version PID'
  const versionPID = versionsBlock?.versionId ?? '';

  const orientationType =
    versionsBlock?.types?.find(type =>
      Object.keys(ORIENTATION_MAPPING).includes(type),
    ) ?? 'Original';

  const orientation = ORIENTATION_MAPPING[orientationType];

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

  const subType = aresMediaMetadata?.subType;

  // Referred to as 'clip PID', 'episode PID' or 'parent PID'
  const parentPID = aresMediaMetadata?.id;

  const holdingImageURL = rawImage
    ? buildIChefURL({
        originCode,
        locator,
        resolution: DEFAULT_WIDTH,
      })
    : aresMediaMetadata?.imageUrl;

  const isLive = aresMediaMetadata?.live ?? false;

  const items: PlaylistItem[] = [
    {
      versionID: versionPID,
      kind,
      duration: rawDuration,
      ...(isLive && { live: true }),
    },
  ];

  if (showAds) items.unshift({ kind: 'advert' });

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

  const ampIframeUrl = getAmpIframeUrl({ id, parentPID, versionPID, lang });

  const externalEmbedUrl = getExternalEmbedUrl({
    id,
    parentPID,
    versionPID,
    lang,
  });

  return {
    mediaType: actualFormat || 'video',
    playerConfig: {
      ...basePlayerConfig,
      ...(embedded && { insideIframe: true, embeddedOffsite: true }),
      ...(externalEmbedUrl && { externalEmbedUrl }),
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
        ...(subType === 'clip' && { clipPID: parentPID }),
        ...(subType === 'episode' && { episodePID: parentPID }),
      },
    },
    placeholderConfig,
    showAds,
    orientation,
    ...(ampIframeUrl && { ampIframeUrl }),
  };
};
