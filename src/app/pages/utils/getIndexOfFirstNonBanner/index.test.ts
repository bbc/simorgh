import {
  Curation,
  VISUAL_PROMINENCE,
  VISUAL_STYLE,
} from '#app/models/types/curationData';
import getIndexOfFirstNonBanner from '.';

describe('getIndexOfFirstNonBanner', () => {
  it('should return 0 as it is the first non-banner curation in the list ', () => {
    const curationsWithCollectionAsFirstItem: Curation[] = [
      {
        visualStyle: VISUAL_STYLE.COLLECTION,
        visualProminence: VISUAL_PROMINENCE.HIGH,
        position: 0,
      },
      {
        visualStyle: VISUAL_STYLE.COLLECTION,
        visualProminence: VISUAL_PROMINENCE.NORMAL,
        position: 1,
      },
      {
        visualStyle: VISUAL_STYLE.BANNER,
        visualProminence: VISUAL_PROMINENCE.NORMAL,
        position: 2,
      },
      {
        visualStyle: VISUAL_STYLE.BANNER,
        visualProminence: VISUAL_PROMINENCE.NORMAL,
        position: 3,
      },
    ];
    const index = getIndexOfFirstNonBanner(curationsWithCollectionAsFirstItem);
    expect(index).toEqual(0);
  });

  it('should return 1 as it is the first non-banner curation in the list ', () => {
    const curationsWithBannerAsFirstItem: Curation[] = [
      {
        visualStyle: VISUAL_STYLE.BANNER,
        visualProminence: VISUAL_PROMINENCE.HIGH,
        position: 0,
      },
      {
        visualStyle: VISUAL_STYLE.COLLECTION,
        visualProminence: VISUAL_PROMINENCE.NORMAL,
        position: 1,
      },
      {
        visualStyle: VISUAL_STYLE.COLLECTION,
        visualProminence: VISUAL_PROMINENCE.NORMAL,
        position: 2,
      },
      {
        visualStyle: VISUAL_STYLE.BANNER,
        visualProminence: VISUAL_PROMINENCE.NORMAL,
        position: 3,
      },
    ];
    const index = getIndexOfFirstNonBanner(curationsWithBannerAsFirstItem);
    expect(index).toEqual(1);
  });

  it('should return 3 as it is the first non-banner curation in the list ', () => {
    const curationsWithBannersAsFirstThreeItems: Curation[] = [
      {
        visualStyle: VISUAL_STYLE.BANNER,
        visualProminence: VISUAL_PROMINENCE.HIGH,
        position: 0,
      },
      {
        visualStyle: VISUAL_STYLE.BANNER,
        visualProminence: VISUAL_PROMINENCE.NORMAL,
        position: 1,
      },
      {
        visualStyle: VISUAL_STYLE.BANNER,
        visualProminence: VISUAL_PROMINENCE.NORMAL,
        position: 2,
      },
      {
        visualStyle: VISUAL_STYLE.COLLECTION,
        visualProminence: VISUAL_PROMINENCE.NORMAL,
        position: 3,
      },
    ];
    const index = getIndexOfFirstNonBanner(
      curationsWithBannersAsFirstThreeItems,
    );
    expect(index).toEqual(3);
  });
});
