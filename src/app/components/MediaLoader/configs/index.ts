import filterForBlockType from '#app/lib/utilities/blockHandlers';
import clipMedia from './clipMedia';
import aresMedia from './aresMedia';
import tvMedia from './tvMedia';
import {
  ConfigBuilderReturnProps,
  MediaBlock,
  ConfigBuilderProps,
} from '../types';

const blockTypeMapping: Record<
  string,
  (arg0: ConfigBuilderProps) => ConfigBuilderReturnProps
> = {
  aresMedia,
  clipMedia,
  tvMedia,
};

/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
export default (blocks: MediaBlock[]) => {
  for (const blockType of ['aresMedia', 'clipMedia', 'tvMedia']) {
    const mediaBlock = filterForBlockType(blocks, blockType);
    if (mediaBlock) {
      return blockTypeMapping[blockType];
    }
  }
};
