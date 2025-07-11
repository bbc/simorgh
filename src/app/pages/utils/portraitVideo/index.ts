import {
  AresMediaBlock,
  AresMediaMetadataBlock,
  Orientations,
} from '#app/components/MediaLoader/types';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { OptimoBlock } from '#app/models/types/optimo';

const ORIENTATION_MAPPING: Record<string, Orientations> = {
  Portrait: 'portrait',
  Original: 'landscape',
};

const getAresMediaMetadata = (mediaBlock: OptimoBlock[]) => {
  const { model: aresMedia }: AresMediaBlock =
    filterForBlockType(mediaBlock, 'aresMedia') ?? {};

  const { model: aresMediaMetadata }: AresMediaMetadataBlock =
    filterForBlockType(aresMedia?.blocks ?? [], 'aresMediaMetadata') ?? {};

  return aresMediaMetadata;
};

export const isPortraitVideo = (mediaBlock: OptimoBlock[]) => {
  const aresMediaMetadata = getAresMediaMetadata(mediaBlock);

  const { webcastVersions = [] } = aresMediaMetadata ?? {};

  const hasWebcastItems = webcastVersions.length > 0;

  const versionParameter = hasWebcastItems ? 'webcastVersions' : 'versions';

  const versionsBlock = aresMediaMetadata?.[versionParameter]?.[0];

  const orientationType =
    versionsBlock?.types?.find(type =>
      Object.keys(ORIENTATION_MAPPING).includes(type),
    ) ?? 'Original';

  return orientationType === 'Portrait';
};

export const isPortraitVideoUnderHeadline = (
  articlePageBlocks: OptimoBlock[],
  mediaBlock: OptimoBlock[],
) => {
  const blockUnderHeadline = articlePageBlocks[1];
  if (blockUnderHeadline.type !== 'video' || !isPortraitVideo(mediaBlock)) {
    return false;
  }

  const targetAresMediaMetadataBlock = getAresMediaMetadata(
    (blockUnderHeadline?.model as { blocks?: OptimoBlock[] })?.blocks ?? [],
  );

  const currentAresMediaMetadata = getAresMediaMetadata(mediaBlock);

  if (targetAresMediaMetadataBlock?.id === currentAresMediaMetadata?.id) {
    return true;
  }
  return false;
};
