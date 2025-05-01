import filterForBlockType from '#app/lib/utilities/blockHandlers';
import clipMedia from './clipMedia';
import aresMedia from './aresMedia';
import tv from './tv';
import liveRadio from './liveRadio';
import audio from './audio';
import legacyMedia from './legacyMedia';

import {
  ConfigBuilderReturnProps,
  MediaBlock,
  ConfigBuilderProps,
} from '../types';
import liveMedia from './liveMedia';

const BLOCK_TYPES = [
  'aresMedia',
  'clipMedia',
  'tv',
  'liveRadio',
  'audio',
  'legacyMedia',
  'liveMedia',
] as const;

const blockTypeMapping: Record<
  (typeof BLOCK_TYPES)[number],
  (_arg0: ConfigBuilderProps) => ConfigBuilderReturnProps
> = {
  aresMedia,
  clipMedia,
  tv,
  liveRadio,
  audio,
  legacyMedia,
  liveMedia,
};

export default (blocks: MediaBlock[]) => {
  const blockType = BLOCK_TYPES.find(type => filterForBlockType(blocks, type));

  if (!blockType) return null;

  return blockTypeMapping[blockType];
};
