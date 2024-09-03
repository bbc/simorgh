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
  embedded,
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

  const videoId = aresMediaMetadata?.id;

  const holdingImageURL = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

  const items = [{ versionID, kind, duration: rawDuration }];
  if (showAds) items.unshift({ kind: 'advert' } as PlaylistItem);

  const placeholderConfig = buildPlaceholderConfig({
    title,
    type: format || 'video',
    duration: rawDuration,
    durationISO8601: versionsBlock?.durationISO8601,
    guidanceMessage,
    holdingImageURL,
    translations,
    placeholderImageOriginCode: originCode,
    placeholderImageLocator: locator,
  });

  return {
    mediaType: format || 'video',
    playerConfig: {
      ...basePlayerConfig,
      autoplay: pageType !== 'mediaArticle',
      ...(embedded && { insideIframe: true, embeddedOffsite: true }),
      playlistObject: {
        title,
        summary: caption || '',
        holdingImageURL,
        items,
        ...(guidanceMessage && { guidance: guidanceMessage }),
        ...(embeddingAllowed && { embedRights: 'allowed' }),
      },
      ...(pageType === 'mediaArticle' && { preload: 'high' }),
      statsObject: {
        ...basePlayerConfig.statsObject,
        clipPID: subType === 'clip' ? videoId : null,
        episodePID: subType === 'episode' ? videoId : null,
      },
    },
    placeholderConfig,
    showAds,
  };
};
