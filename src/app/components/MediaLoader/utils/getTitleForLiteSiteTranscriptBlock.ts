import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { AresMediaBlock, AresMediaMetadataBlock, MediaBlock } from '../types';

export default (blocks: MediaBlock[]) => {
  const { model: aresMedia }: AresMediaBlock =
    filterForBlockType(blocks, 'aresMedia') ?? {};

  const { model: aresMediaMetadata }: AresMediaMetadataBlock =
    filterForBlockType(aresMedia?.blocks, 'aresMediaMetadata') ?? {};

  const title = aresMediaMetadata?.title ?? '';

  return title;
};
