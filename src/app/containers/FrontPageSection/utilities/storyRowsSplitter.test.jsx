import range from 'ramda/src/range';
import getRows from './storyRowsSplitter';

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
      firstRow: [],
      regularRows: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
      ],
      noImageRow: [8, 9, 10, 11],
    },
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
      firstRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [9, 10, 11, 12],
    },
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
      noImageRow: [10, 11, 12, 13],
    },
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
      firstRow: [],
      regularRows: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
      ],
      noImageRow: [8, 9, 10, 11],
    },
  },
};

const rowsTest = (value) => {
  it(`should return right splitting for ${value} stories for first section`, () => {
    expect(getRows(numberOfStories[value].input, true)).toStrictEqual(
      numberOfStories[value].expectedFirstSection,
    );
  });

  it(`should return right splitting for ${value} stories for non-first section`, () => {
    expect(getRows(numberOfStories[value].input, false)).toStrictEqual(
      numberOfStories[value].expectedNotFirstSection,
    );
  });
};

describe('Story rows splitter', () => {
  describe('assertions', () => {
    describe('getRows', () => {
      Object.keys(numberOfStories).forEach((value) => rowsTest(value));
    });
  });
});
