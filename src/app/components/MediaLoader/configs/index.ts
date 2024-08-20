import filterForBlockType from '#app/lib/utilities/blockHandlers';
import clipMedia from './clipMedia';
import aresMedia from './aresMedia';
import tvMedia from './tvMedia';
import { MediaBlock } from '../types';

const blockTypeMapping = {
  aresMedia: aresMedia,
  clipMedia: clipMedia,
  tvMedia: tvMedia,
};

export default (blocks: MediaBlock[]) => {
  ['aresMedia', 'clipMedia', 'tvMedia'].forEach(blockType => {
    const mediaBlock = filterForBlockType(blocks, blockType);
    if (!!mediaBlock) {
      // @ts-expect-error wip, we will fix this!
      const config = blockTypeMapping[blockType];
      return config;
    }
  });
};
