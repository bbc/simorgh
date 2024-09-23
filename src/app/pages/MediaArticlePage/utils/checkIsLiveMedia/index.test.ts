import { OptimoBlock } from '#app/models/types/optimo';
import { pidginPageData, arabicLiveTvPageData } from '../../fixtureData';
import checkIsLiveMedia from '.';

describe('checkIsLiveMedia', () => {
  it('should return false if there are no media blocks', () => {
    const blocks = [] as OptimoBlock[];
    expect(checkIsLiveMedia(blocks)).toBe(false);
  });

  it('should return false if there are multiple media blocks', () => {
    const blocks = [
      {
        type: 'video',
      },
      {
        type: 'audio',
      },
    ] as OptimoBlock[];

    expect(checkIsLiveMedia(blocks)).toBe(false);
  });

  it('should return false if there is no aresMediaMetadata block', () => {
    const blocks = [{ type: 'video' }] as OptimoBlock[];

    expect(checkIsLiveMedia(blocks)).toBe(false);
  });

  it('should return false if aresMediaMetadata block is not live', () => {
    expect(checkIsLiveMedia(pidginPageData?.content?.model?.blocks)).toBe(
      false,
    );
  });

  it('should return true if aresMediaMetadata block is live', () => {
    expect(checkIsLiveMedia(arabicLiveTvPageData?.content?.model?.blocks)).toBe(
      true,
    );
  });
});
