import { range } from 'ramda';
import getRows from './storySplitter';

const numberOfStories = {
  0: {
    input: [],
    expectedFirstSection: {
      topRow: [],
      regularRows: [],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      topRow: [],
      regularRows: [],
      noImageRow: [],
    },
  },
  1: {
    input: range(0, 1),
    expectedFirstSection: {
      topRow: [0],
      regularRows: [],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      topRow: [0],
      regularRows: [],
      noImageRow: [],
    },
  },
  2: {
    input: range(0, 2),
    expectedFirstSection: {
      topRow: [0],
      regularRows: [],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      topRow: [0, 1],
      regularRows: [],
      noImageRow: [],
    },
  },
  3: {
    input: range(0, 3),
    expectedFirstSection: {
      topRow: [0],
      regularRows: [],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      topRow: [0, 1],
      regularRows: [],
      noImageRow: [],
    },
  },
  4: {
    input: range(0, 4),
    expectedFirstSection: {
      topRow: [0],
      regularRows: [],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      topRow: [],
      regularRows: [[0, 1, 2, 3]],
      noImageRow: [],
    },
  },
  5: {
    input: range(0, 5),
    expectedFirstSection: {
      topRow: [0],
      regularRows: [[1, 2, 3, 4]],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      topRow: [0],
      regularRows: [[1, 2, 3, 4]],
      noImageRow: [],
    },
  },
  6: {
    input: range(0, 6),
    expectedFirstSection: {
      topRow: [0],
      regularRows: [[1, 2, 3, 4]],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      topRow: [0, 1],
      regularRows: [[2, 3, 4, 5]],
      noImageRow: [],
    },
  },
  7: {
    input: range(0, 7),
    expectedFirstSection: {
      topRow: [0],
      regularRows: [[1, 2, 3, 4]],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      topRow: [0, 1],
      regularRows: [[2, 3, 4, 5]],
      noImageRow: [],
    },
  },
  8: {
    input: range(0, 8),
    expectedFirstSection: {
      topRow: [0],
      regularRows: [[1, 2, 3, 4]],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      topRow: [],
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
      topRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      topRow: [0],
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
      topRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      topRow: [0, 1],
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
      topRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      topRow: [0, 1],
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
      topRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [],
    },
    expectedNotFirstSection: {
      topRow: [0, 1],
      regularRows: [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
      noImageRow: [],
    },
  },
  13: {
    input: range(0, 13),
    expectedFirstSection: {
      topRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [9, 10, 11, 12],
    },
    expectedNotFirstSection: {
      topRow: [0, 1],
      regularRows: [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
      noImageRow: [],
    },
  },
  14: {
    input: range(0, 14),
    expectedFirstSection: {
      topRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [9, 10, 11, 12],
    },
    expectedNotFirstSection: {
      topRow: [0, 1],
      regularRows: [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
      noImageRow: [],
    },
  },
  20: {
    input: range(0, 20),
    expectedFirstSection: {
      topRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [9, 10, 11, 12],
    },
    expectedNotFirstSection: {
      topRow: [0, 1],
      regularRows: [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
      noImageRow: [],
    },
  },
};

describe('getItems for first section', () => {
  describe('assertions', () => {
    Object.keys(numberOfStories).forEach(value =>
      it(`should return right splitting for ${value} stories`, () => {
        expect(getRows(numberOfStories[value].input, true)).toStrictEqual(
          numberOfStories[value].expectedFirstSection,
        );
      }),
    );
  });
});

describe('getItems for non-first section', () => {
  describe('assertions', () => {
    Object.keys(numberOfStories).forEach(value =>
      it(`should return right splitting for ${value} stories`, () => {
        expect(getRows(numberOfStories[value].input, false)).toStrictEqual(
          numberOfStories[value].expectedNotFirstSection,
        );
      }),
    );
  });
});
