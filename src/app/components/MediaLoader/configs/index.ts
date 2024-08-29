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

export default (blocks: MediaBlock[]) => {
  const availableMediaType = ['aresMedia', 'clipMedia', 'tvMedia'].find(
    mediaType => filterForBlockType(blocks, mediaType),
  );
  if (!availableMediaType) {
    return null;
  }
  return blockTypeMapping[availableMediaType];
};
