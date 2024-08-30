import filterForBlockType from '#app/lib/utilities/blockHandlers';
import clipMedia from './clipMedia';
import aresMedia from './aresMedia';
import tv from './tv';
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
  onDemandTV: tv,
};

export default (blocks: MediaBlock[]) => {
  const availableMediaType = ['aresMedia', 'clipMedia', 'onDemandTV'].find(
    mediaType => filterForBlockType(blocks, mediaType),
  );
  if (!availableMediaType) {
    return null;
  }
  return blockTypeMapping[availableMediaType];
};
