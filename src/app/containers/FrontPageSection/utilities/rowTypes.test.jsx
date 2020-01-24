import getRowTypes from './rowTypes';
import {
  TopRow,
  RegularRow,
  LeadingRow,
} from '#app/containers/FrontPageStoryRows';

const rowValues = {
  'top story, regular, regular, no image': {
    input: {
      topRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [9, 10, 11, 12],
    },
    expected: [
      {
        stories: [0],
        rowType: TopRow,
        displayImages: true,
      },
      {
        stories: [1, 2, 3, 4],
        rowType: RegularRow,
        displayImages: true,
      },
      {
        stories: [5, 6, 7, 8],
        rowType: RegularRow,
        displayImages: true,
      },
      {
        stories: [9, 10, 11, 12],
        rowType: RegularRow,
        displayImages: false,
      },
    ],
  },
  'leading, regular, regular': {
    input: {
      topRow: [0, 1],
      regularRows: [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
      noImageRow: [],
    },
    expected: [
      {
        stories: [0, 1],
        rowType: LeadingRow,
        displayImages: true,
      },
      {
        stories: [2, 3, 4, 5],
        rowType: RegularRow,
        displayImages: true,
      },
      {
        stories: [6, 7, 8, 9],
        rowType: RegularRow,
        displayImages: true,
      },
    ],
  },
  'leading, regular': {
    input: {
      topRow: [0, 1],
      regularRows: [[2, 3, 4, 5]],
      noImageRow: [],
    },
    expected: [
      {
        stories: [0, 1],
        rowType: LeadingRow,
        displayImages: true,
      },
      {
        stories: [2, 3, 4, 5],
        rowType: RegularRow,
        displayImages: true,
      },
    ],
  },
  'top, regular': {
    input: {
      topRow: [0],
      regularRows: [[1, 2, 3, 4]],
      noImageRow: [],
    },
    expected: [
      { stories: [0], rowType: TopRow, displayImages: true },
      {
        stories: [1, 2, 3, 4],
        rowType: RegularRow,
        displayImages: true,
      },
    ],
  },
  leading: {
    input: {
      topRow: [0, 1],
      regularRows: [],
      noImageRow: [],
    },
    expected: [
      {
        stories: [0, 1],
        rowType: LeadingRow,
        displayImages: true,
      },
    ],
  },
  top: {
    input: {
      topRow: [0],
      regularRows: [],
      noImageRow: [],
    },
    expected: [{ stories: [0], rowType: TopRow, displayImages: true }],
  },
  regular: {
    input: {
      topRow: [],
      regularRows: [[0, 1, 2, 3]],
      noImageRow: [],
    },
    expected: [
      {
        stories: [0, 1, 2, 3],
        rowType: RegularRow,
        displayImages: true,
      },
    ],
  },
  'regular, regular': {
    input: {
      topRow: [],
      regularRows: [
        [0, 1, 2, 3],
        [5, 6, 7, 8],
      ],
      noImageRow: [],
    },
    expected: [
      {
        stories: [0, 1, 2, 3],
        rowType: RegularRow,
        displayImages: true,
      },
      {
        stories: [5, 6, 7, 8],
        rowType: RegularRow,
        displayImages: true,
      },
    ],
  },
};

describe('getRows for first section', () => {
  describe('assertions', () => {
    Object.keys(rowValues).forEach(value =>
      it(`should return right splitting for ${value} rows`, () => {
        expect(getRowTypes(rowValues[value].input)).toStrictEqual(
          rowValues[value].expected,
        );
      }),
    );
  });
});
