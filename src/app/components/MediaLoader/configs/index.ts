import filterForBlockType from '#app/lib/utilities/blockHandlers';
import type {
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
  MediaBlock,
} from '../types';
import aresMedia from './aresMedia';
import audio from './audio';
import legacyMedia from './legacyMedia';
import liveMedia from './liveMedia';
import livePostClipMedia from './livePostClipMedia';
import liveRadio from './liveRadio';
import portraitClipMedia from './portraitClipMedia';
import tv from './tv';

const BLOCK_TYPES = [
  'aresMedia',
  'clipMedia',
  'portraitClipMedia',
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
  clipMedia: livePostClipMedia,
  portraitClipMedia,
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
