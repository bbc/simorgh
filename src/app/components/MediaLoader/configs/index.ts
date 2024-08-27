import filterForBlockType from '#app/lib/utilities/blockHandlers';
import clipMedia from './clipMedia';
import aresMedia from './aresMedia';
import tvMedia from './tvMedia';
import { MediaBlock } from '../types';

const blockTypeMapping = {
  aresMedia,
  clipMedia,
  tvMedia,
};

export default (blocks: MediaBlock[]) => {
  let config;
  // eslint-disable-next-line no-restricted-syntax
  for (const blockType of ['aresMedia', 'clipMedia', 'tvMedia']) {
    const mediaBlock = filterForBlockType(blocks, blockType);
    if (mediaBlock) {
      // @ts-expect-error wip, we will fix this!
      config = blockTypeMapping[blockType];
      if (config) {
        break;
      }
    }
  }
  return config;
};
