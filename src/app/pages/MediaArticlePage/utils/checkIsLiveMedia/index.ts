import {
  AresMediaBlock,
  AresMediaMetadataBlock,
} from '#app/components/MediaLoader/types';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { OptimoBlock } from '#app/models/types/optimo';

const checkIsLiveMedia = (blocks: OptimoBlock[]) => {
  const mediaBlocks = blocks.filter(
    block => block.type === 'video' || block.type === 'audio',
  );

  if (!mediaBlocks || mediaBlocks?.length !== 1) return false;

  // @ts-expect-error - nested block structure
  const mediaBlock = mediaBlocks?.[0]?.model?.blocks;

  const { model: aresMedia }: AresMediaBlock =
    filterForBlockType(mediaBlock, 'aresMedia') ?? {};

  const { model: aresMediaMetadata }: AresMediaMetadataBlock =
    filterForBlockType(aresMedia?.blocks, 'aresMediaMetadata') ?? {};

  return Boolean(aresMediaMetadata?.live);
};

export default checkIsLiveMedia;
