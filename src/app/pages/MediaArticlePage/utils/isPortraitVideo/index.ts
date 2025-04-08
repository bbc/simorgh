import {
  AresMediaBlock,
  AresMediaMetadataBlock,
} from '#app/components/MediaLoader/types';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { OptimoBlock } from '#app/models/types/optimo';

const isPortraitVideo = (blocks: OptimoBlock[]) => {
  const { model: aresMedia }: AresMediaBlock =
    filterForBlockType(blocks, 'aresMedia') ?? {};

  const { model: aresMediaMetadata }: AresMediaMetadataBlock =
    filterForBlockType(aresMedia?.blocks, 'aresMediaMetadata') ?? {};

  const orientation = aresMediaMetadata.versions[0]?.types[0];

  return orientation === 'Portrait';
};

export default isPortraitVideo;
