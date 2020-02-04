import { range } from 'ramda';
import { getRows, getAllowedItems } from './storySplitter';

const numberOfStories = {
  0: {
    input: [],
    expectedFirstSection: {
      firstRow: [],
      regularRows: [],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      firstRow: [],
      regularRows: [],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: [],
    expectedNotFrontSectionAllowedItems: [],
  },
  1: {
    input: range(0, 1),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      firstRow: [0],
      regularRows: [],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 1),
    expectedNotFrontSectionAllowedItems: range(0, 1),
  },
  2: {
    input: range(0, 2),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      firstRow: [0, 1],
      regularRows: [],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 2),
    expectedNotFrontSectionAllowedItems: range(0, 2),
  },
  3: {
    input: range(0, 3),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      firstRow: [0, 1],
      regularRows: [],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 3),
    expectedNotFrontSectionAllowedItems: range(0, 3),
  },
  4: {
    input: range(0, 4),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      firstRow: [],
      regularRows: [[0, 1, 2, 3]],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 4),
    expectedNotFrontSectionAllowedItems: range(0, 4),
  },
  5: {
    input: range(0, 5),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [[1, 2, 3, 4]],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      firstRow: [0],
      regularRows: [[1, 2, 3, 4]],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 5),
    expectedNotFrontSectionAllowedItems: range(0, 5),
  },
  6: {
    input: range(0, 6),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [[1, 2, 3, 4]],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      firstRow: [0, 1],
      regularRows: [[2, 3, 4, 5]],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 6),
    expectedNotFrontSectionAllowedItems: range(0, 6),
  },
  7: {
    input: range(0, 7),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [[1, 2, 3, 4]],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      firstRow: [0, 1],
      regularRows: [[2, 3, 4, 5]],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 7),
    expectedNotFrontSectionAllowedItems: range(0, 7),
  },
  8: {
    input: range(0, 8),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [[1, 2, 3, 4]],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      firstRow: [],
      regularRows: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
      ],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 8),
    expectedNotFrontSectionAllowedItems: range(0, 8),
  },
  9: {
    input: range(0, 9),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      firstRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 9),
    expectedNotFrontSectionAllowedItems: range(0, 9),
  },
  10: {
    input: range(0, 10),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      firstRow: [0, 1],
      regularRows: [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 10),
    expectedNotFrontSectionAllowedItems: range(0, 10),
  },
  11: {
    input: range(0, 11),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      firstRow: [0, 1],
      regularRows: [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 11),
    expectedNotFrontSectionAllowedItems: range(0, 10),
  },
  12: {
    input: range(0, 12),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      firstRow: [0, 1],
      regularRows: [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 12),
    expectedNotFrontSectionAllowedItems: range(0, 10),
  },
  13: {
    input: range(0, 13),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [9, 10, 11, 12],
    },
    expectedNotFirstSection: {
      firstRow: [0, 1],
      regularRows: [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 13),
    expectedNotFrontSectionAllowedItems: range(0, 10),
  },
  14: {
    input: range(0, 14),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [9, 10, 11, 12],
    },
    expectedNotFirstSection: {
      firstRow: [0, 1],
      regularRows: [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 13),
    expectedNotFrontSectionAllowedItems: range(0, 10),
  },
  20: {
    input: range(0, 20),
    expectedFirstSection: {
      firstRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [9, 10, 11, 12],
    },
    expectedNotFirstSection: {
      firstRow: [0, 1],
      regularRows: [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
      noImageRow: [],
    },
    expectedFrontSectionAllowedItems: range(0, 13),
    expectedNotFrontSectionAllowedItems: range(0, 10),
  },
};

const returnRightStories = (value, message) => {
  it(message, () =>
    expect(getRows(numberOfStories[value].input, true)).toStrictEqual(
      numberOfStories[value].expectedFirstSection,
    ),
  );

  it(message, () =>
    expect(getRows(numberOfStories[value].input, false)).toStrictEqual(
      numberOfStories[value].expectedNotFirstSection,
    ),
  );

  it(message, () =>
    expect(getAllowedItems(numberOfStories[value].input, true)).toStrictEqual(
      numberOfStories[value].expectedFrontSectionAllowedItems,
    ),
  );

  it(message, () =>
    expect(getAllowedItems(numberOfStories[value].input, false)).toStrictEqual(
      numberOfStories[value].expectedNotFrontSectionAllowedItems,
    ),
  );
};

describe('getRows for first section', () => {
  describe('assertions', () => {
    Object.keys(numberOfStories).forEach(value =>
      returnRightStories(
        value,
        `should return right splitting for ${value} stories`,
      ),
    );
  });
});

describe('getRows for non-first section', () => {
  describe('assertions', () => {
    Object.keys(numberOfStories).forEach(value =>
      returnRightStories(
        value,
        `should return right splitting for ${value} stories`,
      ),
    );
  });
});

describe('getAllowedItems for first section', () => {
  describe('assertions', () => {
    Object.keys(numberOfStories).forEach(value =>
      returnRightStories(
        value,
        `should return right allowed items for ${value} stories`,
      ),
    );
  });
});

describe('getAllowedItems for non-first section', () => {
  describe('assertions', () => {
    Object.keys(numberOfStories).forEach(value =>
      returnRightStories(
        value,
        `should return right allowed items for ${value} stories`,
      ),
    );
  });
});
