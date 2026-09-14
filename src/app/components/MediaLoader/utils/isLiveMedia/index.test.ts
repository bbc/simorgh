import arabicSilverLiveStreamFixture from '#data/arabic/articles/c5y35dxlpv2o.json';
import { aresMediaBlocks, aresMediaLiveStreamBlocks } from '../../fixture';
import { MediaBlock } from '../../types';
import isLiveMedia from '.';

describe('isLiveMedia', () => {
  it('returns false for on-demand media', () => {
    expect(isLiveMedia(aresMediaBlocks as MediaBlock[])).toBe(false);
  });

  it('returns true when media has a live flag', () => {
    expect(isLiveMedia(aresMediaLiveStreamBlocks as MediaBlock[])).toBe(true);
  });

  it('returns true when Silver media has a webcast version', () => {
    const [videoBlock] =
      arabicSilverLiveStreamFixture.data.article.promo.media.blocks;

    expect(
      isLiveMedia(videoBlock.model.blocks as unknown as MediaBlock[]),
    ).toBe(true);
  });
});
