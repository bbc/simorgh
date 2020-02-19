import range from 'ramda/src/range';
import { getAllowedItems } from './filterAllowedItems';

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

const allowedItemsTest = value => {
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
      Object.keys(numberOfStories).forEach(value => allowedItemsTest(value));
    });
  });
});
