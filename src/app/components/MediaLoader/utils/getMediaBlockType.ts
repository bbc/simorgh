import filterForBlockType from '#lib/utilities/blockHandlers';
import { MediaBlock } from '../types';

export default function getMediaBlockType(blocks: MediaBlock[]) {
  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  const clipBlock = filterForBlockType(blocks, 'clipMedia');

  switch (true) {
    case !!aresMediaBlock:
      return 'aresMedia';
    case !!clipBlock:
      return 'clipMedia';
    default:
      return null;
  }
}
