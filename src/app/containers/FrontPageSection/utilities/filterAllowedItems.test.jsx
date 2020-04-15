import range from 'ramda/src/range';
import {
  getAllowedItems,
  removeFirstSlotRadioBulletin,
  removeTVBulletinsIfNotAVLiveStream,
  removeItemsWithoutUrlOrHeadline,
} from './filterAllowedItems';

const numberOfStories = {
  0: {
    input: [],
    expectedFrontSectionAllowedItems: [],
    expectedNotFrontSectionAllowedItems: [],
  },
  1: {
    input: range(0, 1),
    expectedFrontSectionAllowedItems: range(0, 1),
    expectedNotFrontSectionAllowedItems: range(0, 1),
  },
  2: {
    input: range(0, 2),
    expectedFrontSectionAllowedItems: range(0, 2),
    expectedNotFrontSectionAllowedItems: range(0, 2),
  },
  3: {
    input: range(0, 3),
    expectedFrontSectionAllowedItems: range(0, 3),
    expectedNotFrontSectionAllowedItems: range(0, 3),
  },
  4: {
    input: range(0, 4),
    expectedFrontSectionAllowedItems: range(0, 4),
    expectedNotFrontSectionAllowedItems: range(0, 4),
  },
  5: {
    input: range(0, 5),
    expectedFrontSectionAllowedItems: range(0, 5),
    expectedNotFrontSectionAllowedItems: range(0, 5),
  },
  6: {
    input: range(0, 6),
    expectedFrontSectionAllowedItems: range(0, 6),
    expectedNotFrontSectionAllowedItems: range(0, 6),
  },
  7: {
    input: range(0, 7),
    expectedFrontSectionAllowedItems: range(0, 7),
    expectedNotFrontSectionAllowedItems: range(0, 7),
  },
  8: {
    input: range(0, 8),
    expectedFrontSectionAllowedItems: range(0, 8),
    expectedNotFrontSectionAllowedItems: range(0, 8),
  },
  9: {
    input: range(0, 9),
    expectedFrontSectionAllowedItems: range(0, 9),
    expectedNotFrontSectionAllowedItems: range(0, 9),
  },
  10: {
    input: range(0, 10),
    expectedFrontSectionAllowedItems: range(0, 10),
    expectedNotFrontSectionAllowedItems: range(0, 10),
  },
  11: {
    input: range(0, 11),
    expectedFrontSectionAllowedItems: range(0, 11),
    expectedNotFrontSectionAllowedItems: range(0, 10),
  },
  12: {
    input: range(0, 12),
    expectedFrontSectionAllowedItems: range(0, 12),
    expectedNotFrontSectionAllowedItems: range(0, 10),
  },
  13: {
    input: range(0, 13),
    expectedFrontSectionAllowedItems: range(0, 13),
    expectedNotFrontSectionAllowedItems: range(0, 10),
  },
  14: {
    input: range(0, 14),
    expectedFrontSectionAllowedItems: range(0, 13),
    expectedNotFrontSectionAllowedItems: range(0, 10),
  },
  20: {
    input: range(0, 20),
    expectedFrontSectionAllowedItems: range(0, 13),
    expectedNotFrontSectionAllowedItems: range(0, 10),
  },
};

const radioBulletin = { contentType: 'RadioBulletin' };

const someOtherPromo = { contentType: 'SomeOtherPromo' };

const normalItem = {
  assetTypeCode: 'Something',
  name: 'A headline',
  uri: 'www.bbc.co.uk',
};

const noUrlItem = { ...normalItem, uri: undefined };

const noHeadlineItem = { ...normalItem, name: undefined };

const normalNoAssetTypeItem = {
  headlines: { headline: 'A headline' },
  locators: { assetUri: 'www.bbc.co.uk' },
};

const noUrlNoAssetTypeItem = { ...normalNoAssetTypeItem, locators: undefined };

const noHeadlineNoAssetTypeItem = {
  ...normalNoAssetTypeItem,
  headlines: undefined,
};

const allowedItemsTest = (value) => {
  it(`should return right allowed items for ${value} stories for first section`, () => {
    expect(getAllowedItems(numberOfStories[value].input, true)).toStrictEqual(
      numberOfStories[value].expectedFrontSectionAllowedItems,
    );
  });

  it(`should return right allowed items for ${value} stories for non-first section`, () => {
    expect(getAllowedItems(numberOfStories[value].input, false)).toStrictEqual(
      numberOfStories[value].expectedNotFrontSectionAllowedItems,
    );
  });
};

describe('Story allowed items', () => {
  describe('assertions', () => {
    describe('getAllowedItems', () => {
      Object.keys(numberOfStories).forEach((value) => allowedItemsTest(value));
    });

    describe('removeFirstSlotRadioBulletin', () => {
      it('should remove the first radio bulletin', () => {
        expect(
          removeFirstSlotRadioBulletin([
            radioBulletin,
            someOtherPromo,
            someOtherPromo,
            radioBulletin,
            someOtherPromo,
          ]),
        ).toStrictEqual([
          someOtherPromo,
          someOtherPromo,
          radioBulletin,
          someOtherPromo,
        ]);
      });

      it('should remove multiple first radio bulletins', () => {
        expect(
          removeFirstSlotRadioBulletin([
            radioBulletin,
            radioBulletin,
            radioBulletin,
            someOtherPromo,
            radioBulletin,
            radioBulletin,
            radioBulletin,
          ]),
        ).toStrictEqual([
          someOtherPromo,
          radioBulletin,
          radioBulletin,
          radioBulletin,
        ]);
      });

      it('should not remove anything when not radio bulletin first', () => {
        expect(
          removeFirstSlotRadioBulletin([
            someOtherPromo,
            radioBulletin,
            someOtherPromo,
            someOtherPromo,
            radioBulletin,
            radioBulletin,
          ]),
        ).toStrictEqual([
          someOtherPromo,
          radioBulletin,
          someOtherPromo,
          someOtherPromo,
          radioBulletin,
          radioBulletin,
        ]);
      });

      it('should remove everything when only radio bulletins', () => {
        expect(
          removeFirstSlotRadioBulletin([
            radioBulletin,
            radioBulletin,
            radioBulletin,
          ]),
        ).toStrictEqual([]);
      });
    });

    describe('removeTVBulletinsIfNotAVLiveStream', () => {
      describe('single TVBulletin', () => {
        const onlyTVBulletin = {
          input: [{ contentType: 'TVBulletin' }],
          'av-live-streams': [{ contentType: 'TVBulletin' }],
          'not-av-live-streams': [],
        };

        it('should leave single TVBulletin for av-live-streams', () => {
          expect(
            removeTVBulletinsIfNotAVLiveStream({
              items: onlyTVBulletin.input,
              type: 'av-live-streams',
            }),
          ).toStrictEqual(onlyTVBulletin['av-live-streams']);
        });

        it('should filter single TVBulletin for not-av-live-streams', () => {
          expect(
            removeTVBulletinsIfNotAVLiveStream({
              items: onlyTVBulletin.input,
              type: 'not-av-live-streams',
            }),
          ).toStrictEqual(onlyTVBulletin['not-av-live-streams']);
        });
      });

      describe('multiple TVBulletins', () => {
        const multipleTVBulletins = {
          input: [
            { contentType: 'TVBulletin' },
            { contentType: 'TVBulletin' },
            { contentType: 'TVBulletin' },
          ],
          'av-live-streams': [
            { contentType: 'TVBulletin' },
            { contentType: 'TVBulletin' },
            { contentType: 'TVBulletin' },
          ],
          'not-av-live-streams': [],
        };

        it('should leave multiple TVBulletins for av-live-streams', () => {
          expect(
            removeTVBulletinsIfNotAVLiveStream({
              items: multipleTVBulletins.input,
              type: 'av-live-streams',
            }),
          ).toStrictEqual(multipleTVBulletins['av-live-streams']);
        });

        it('should filter all TVBulletin for not-av-live-streams', () => {
          expect(
            removeTVBulletinsIfNotAVLiveStream({
              items: multipleTVBulletins.input,
              type: 'not-av-live-streams',
            }),
          ).toStrictEqual(multipleTVBulletins['not-av-live-streams']);
        });
      });

      describe('mixed TVBulletins and non-TVBulletins', () => {
        const mixedTVBulletin = {
          input: [
            { contentType: 'TVBulletin' },
            { contentType: 'NotTVBulletin' },
            { contentType: 'TVBulletin' },
          ],
          'av-live-streams': [
            { contentType: 'TVBulletin' },
            { contentType: 'NotTVBulletin' },
            { contentType: 'TVBulletin' },
          ],
          'not-av-live-streams': [{ contentType: 'NotTVBulletin' }],
        };

        it('should leave all types for av-live-streams', () => {
          expect(
            removeTVBulletinsIfNotAVLiveStream({
              items: mixedTVBulletin.input,
              type: 'av-live-streams',
            }),
          ).toStrictEqual(mixedTVBulletin['av-live-streams']);
        });

        it('should filter all TVBulletins and leave non-TVBulletins for not-av-live-streams', () => {
          expect(
            removeTVBulletinsIfNotAVLiveStream({
              items: mixedTVBulletin.input,
              type: 'not-av-live-streams',
            }),
          ).toStrictEqual(mixedTVBulletin['not-av-live-streams']);
        });
      });

      describe('no TVBulletins', () => {
        const nonTVBulletins = {
          input: [
            { contentType: 'NotTVBulletin' },
            { contentType: 'NotTVBulletin' },
            { contentType: 'NotTVBulletin' },
          ],
          'av-live-streams': [
            { contentType: 'NotTVBulletin' },
            { contentType: 'NotTVBulletin' },
            { contentType: 'NotTVBulletin' },
          ],
          'not-av-live-streams': [
            { contentType: 'NotTVBulletin' },
            { contentType: 'NotTVBulletin' },
            { contentType: 'NotTVBulletin' },
          ],
        };

        it('should leave all non-TVBulletins for av-live-streams', () => {
          expect(
            removeTVBulletinsIfNotAVLiveStream({
              items: nonTVBulletins.input,
              type: 'av-live-streams',
            }),
          ).toStrictEqual(nonTVBulletins['av-live-streams']);
        });

        it('should leave non-TVBulletins for not-av-live-streams', () => {
          expect(
            removeTVBulletinsIfNotAVLiveStream({
              items: nonTVBulletins.input,
              type: 'not-av-live-streams',
            }),
          ).toStrictEqual(nonTVBulletins['not-av-live-streams']);
        });
      });
    });

    describe('removeItemsWithoutUrlOrHeadline', () => {
      it('should filter out items with no URL', () => {
        expect(
          removeItemsWithoutUrlOrHeadline([noUrlItem, normalItem]),
        ).toStrictEqual([normalItem]);
      });

      it('should filter out items with no headline', () => {
        expect(
          removeItemsWithoutUrlOrHeadline([
            normalItem,
            noHeadlineItem,
            normalNoAssetTypeItem,
          ]),
        ).toStrictEqual([normalItem, normalNoAssetTypeItem]);
      });

      it('should filter out items with no assetTypeCode and no URL', () => {
        expect(
          removeItemsWithoutUrlOrHeadline([
            normalNoAssetTypeItem,
            noUrlNoAssetTypeItem,
          ]),
        ).toStrictEqual([normalNoAssetTypeItem]);
      });

      it('should filter out items with no assetTypeCode and no headline', () => {
        expect(
          removeItemsWithoutUrlOrHeadline([
            normalItem,
            noHeadlineNoAssetTypeItem,
            normalNoAssetTypeItem,
          ]),
        ).toStrictEqual([normalItem, normalNoAssetTypeItem]);
      });
    });
  });
});
