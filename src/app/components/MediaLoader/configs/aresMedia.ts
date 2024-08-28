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
  embedUrl,
  isAmp,
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

  const subType = aresMediaBlock?.model?.blocks?.[0]?.model?.subType;

  const videoId = aresMediaBlock?.model?.blocks?.[0]?.model?.id;

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
    mediaType: format || 'video',
    playerConfig: {
      ...basePlayerConfig,
      autoplay: pageType !== 'mediaArticle',
      ...(isAmp && { insideIframe: true }), // TO DO? - Extend to cover syndication
      ...(embeddingAllowed && embedUrl && { externalEmbedUrl: embedUrl }),
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
