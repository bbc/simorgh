import filterForBlockType from '#app/lib/utilities/blockHandlers';
import clipMedia from './clipMedia';
import aresMedia from './aresMedia';
import {
  ConfigBuilderReturnProps,
  MediaBlock,
  ConfigBuilderProps,
} from '../types';

const BLOCK_TYPES = ['aresMedia', 'clipMedia'] as const;

const blockTypeMapping: Record<
  (typeof BLOCK_TYPES)[number],
  (arg0: ConfigBuilderProps) => ConfigBuilderReturnProps
> = {
  aresMedia,
  clipMedia,
};

export default (blocks: MediaBlock[]) => {
  const blockType = BLOCK_TYPES.find(type => filterForBlockType(blocks, type));

  if (!blockType) return null;

  return blockTypeMapping[blockType];
};
