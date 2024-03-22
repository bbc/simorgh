import {
  aresMediaBlocks,
  aresMediaCaptionBlock,
  clipMediaBlocks,
  livePageCaptionBlock,
} from '../fixture';
import { MediaBlock } from '../types';
import getCaptionBlock from './getCaptionBlock';

describe('getCaptionBlock', () => {
  it('Should return a valid caption block for an AresMedia block for an article page.', () => {
    const result = getCaptionBlock(aresMediaBlocks as MediaBlock[], 'article');

    expect(result).toStrictEqual(aresMediaCaptionBlock);
  });

  it('Should return a valid caption block for a ClipMedia block for a live page.', () => {
    const result = getCaptionBlock(clipMediaBlocks as MediaBlock[], 'live');

    expect(result).toStrictEqual(livePageCaptionBlock);
  });
});
