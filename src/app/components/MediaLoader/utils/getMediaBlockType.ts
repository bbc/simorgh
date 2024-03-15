import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  ClipMediaBlock,
  AresMediaBlock,
  MediaBlock,
  MediaBlockType,
} from '../types';

export default function getMediaBlockType(
  blocks: MediaBlock[],
): MediaBlockType | null {
  const aresMediaBlock: AresMediaBlock = filterForBlockType(
    blocks,
    'aresMedia',
  );

  const clipBlock: ClipMediaBlock = filterForBlockType(blocks, 'clipMedia');

  switch (true) {
    case !!aresMediaBlock:
      return aresMediaBlock.type;
    case !!clipBlock:
      return clipBlock.type;
    default:
      return null;
  }
}
