import filterForBlockType from '#app/lib/utilities/blockHandlers';
import {
  AresMediaBlock,
  AresMediaMetadataBlock,
  MediaBlock,
} from '../../types';

const isLiveMedia = (blocks: MediaBlock[]) => {
  const aresMedia = filterForBlockType(blocks, 'aresMedia') as AresMediaBlock;
  const metadata = filterForBlockType(
    aresMedia?.model?.blocks,
    'aresMediaMetadata',
  ) as AresMediaMetadataBlock;

  // silver streams use webcast versions instead of a live flag
  return Boolean(
    metadata?.model?.live || metadata?.model?.webcastVersions?.length,
  );
};

export default isLiveMedia;
