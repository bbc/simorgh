import buildIChefURL from '#lib/utilities/ichefURL';
import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  OptimoImageBlock,
  OptimoRawImageBlock,
} from '#app/models/types/optimo';
import getEmbedURL from '#lib/utilities/getUrlHelpers/getEmbedUrl';
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
  id,
  pageType,
  blocks,
  basePlayerConfig,
  translations,
  adsEnabled = false,
  showAdsBasedOnLocation = false,
  embedded,
  lang,
  isAmp,
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

  const subType = aresMediaMetadata?.subType;

  const videoId = aresMediaMetadata?.id;

  const holdingImageURL = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

  const isLive = aresMediaMetadata?.live ?? false;

  const items = [
    { versionID, kind, duration: rawDuration, ...(isLive && { live: true }) },
  ] as PlaylistItem[];

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

  const embedUrl = getEmbedURL({
    mediaId: `${id}/${versionID}/${lang}`,
    type: 'avEmbed',
    isAmp,
    embedded,
  });

  return {
    mediaType: actualFormat || 'video',
    playerConfig: {
      ...basePlayerConfig,
      autoplay: pageType !== 'mediaArticle',
      ...(embedded && { insideIframe: true, embeddedOffsite: true }),
      ...(embedUrl && { externalEmbedUrl: embedUrl }),
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
        ...(subType === 'clip' && { clipPID: videoId }),
        ...(subType === 'episode' && { episodePID: videoId }),
      },
    },
    placeholderConfig,
    showAds,
  };
};
