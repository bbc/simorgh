import {
  Curation,
  VISUAL_PROMINENCE,
  VISUAL_STYLE,
} from '#app/models/types/curationData';
import getIndexForMPU from '.';

describe('getIndexForMPU', () => {
  it('should return 0 if the first item is not a banner ', () => {
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
    const index = getIndexForMPU(curationsWithCollectionAsFirstItem);
    expect(index).toEqual(0);
  });

  it('should return 1 if the banner is the first item ', () => {
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
    const index = getIndexForMPU(curationsWithBannerAsFirstItem);
    expect(index).toEqual(1);
  });

  it('should return 1 if the banner is the first item ', () => {
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
    const index = getIndexForMPU(curationsWithBannersAsFirstThreeItems);
    expect(index).toEqual(3);
  });
});
