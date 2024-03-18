import filterForBlockType from '#app/lib/utilities/blockHandlers';
import clipMedia from './clipMedia';
import aresMedia from './aresMedia';
import { MediaBlock } from '../types';

export default (blocks: MediaBlock[]) => {
  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');
  const clipMediaBlock = filterForBlockType(blocks, 'clipMedia');

  switch (true) {
    case !!aresMediaBlock:
      return aresMedia;
    case !!clipMediaBlock:
      return clipMedia;
    default:
      return null;
  }
};
