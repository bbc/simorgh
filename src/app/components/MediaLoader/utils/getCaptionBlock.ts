import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { PageTypes } from '#app/models/types/global';
import { CaptionBlock, MediaBlock } from '../types';

export default function getCaptionBlock(
  blocks: MediaBlock[],
  pageType: PageTypes,
): CaptionBlock | null {
  if (pageType === 'live') {
    return filterForBlockType(blocks, 'caption');
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  const articleCaptionBlock = filterForBlockType(blocks, 'caption');
  const cpsCaptionBlock = filterForBlockType(
    aresMediaBlock?.model?.blocks,
    'caption',
  );

  return articleCaptionBlock || cpsCaptionBlock;
}
