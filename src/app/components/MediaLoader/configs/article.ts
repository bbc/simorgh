import buildIChefURL from '#lib/utilities/ichefURL';
import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  AresMediaBlock,
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
} from '../types';
import getCaptionBlock from '../utils/getCaptionBlock';

const DEFAULT_WIDTH = 512;

export default ({
  pageType,
  blocks,
  basePlayerConfig,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const aresMediaBlock: AresMediaBlock = filterForBlockType(
    blocks,
    'aresMedia',
  );

  if (!aresMediaBlock) return null;

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

  const duration =
    aresMediaBlock?.model?.blocks?.[0]?.model?.[versionParameter]?.[0]
      ?.duration;

  const placeholderSrc = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

  const title = aresMediaBlock?.model?.blocks?.[0]?.model?.title;
  const captionBlock = getCaptionBlock(blocks, pageType);

  const caption =
    captionBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  const kind =
    aresMediaBlock?.model?.blocks?.[0]?.model?.smpKind || 'programme';
  const guidanceMessage =
    aresMediaBlock?.model?.blocks?.[0]?.model?.[versionParameter]?.[0]?.warnings
      ?.short;

  return {
    mediaType: format || 'video',
    playerConfig: {
      ...basePlayerConfig,
      autoplay: pageType !== 'mediaArticle',
      playlistObject: {
        title,
        summary: caption || '',
        holdingImageURL: placeholderSrc,
        items: [{ versionID, kind, duration }],
        ...(guidanceMessage && { guidance: guidanceMessage }),
      },
      ...(pageType === 'mediaArticle' && { preload: 'high' }),
      statsObject: {
        ...basePlayerConfig.statsObject,
        clipPID: versionID, // check
      },
    },
  };
};
