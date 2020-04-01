import getRowDetails from './rowDetails';
import {
  TopRow,
  RegularRow,
  LeadingRow,
} from '#app/containers/FrontPageStoryRows';

const rowValues = {
  'top story, regular, regular, no image': {
    input: {
      firstRow: [0],
      regularRows: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      noImageRow: [9, 10, 11, 12],
    },
    expected: [
      {
        stories: [0],
        RowComponent: TopRow,
        displayImages: true,
      },
      {
        stories: [1, 2, 3, 4],
        RowComponent: RegularRow,
        displayImages: true,
      },
      {
        stories: [5, 6, 7, 8],
        RowComponent: RegularRow,
        displayImages: true,
      },
      {
        stories: [9, 10, 11, 12],
        RowComponent: RegularRow,
        displayImages: false,
      },
    ],
  },
  'leading, regular, regular': {
    input: {
      firstRow: [0, 1],
      regularRows: [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
      noImageRow: [],
    },
    expected: [
      {
        stories: [0, 1],
        RowComponent: LeadingRow,
        displayImages: true,
      },
      {
        stories: [2, 3, 4, 5],
        RowComponent: RegularRow,
        displayImages: true,
      },
      {
        stories: [6, 7, 8, 9],
        RowComponent: RegularRow,
        displayImages: true,
      },
    ],
  },
  'leading, regular': {
    input: {
      firstRow: [0, 1],
      regularRows: [[2, 3, 4, 5]],
      noImageRow: [],
    },
    expected: [
      {
        stories: [0, 1],
        RowComponent: LeadingRow,
        displayImages: true,
      },
      {
        stories: [2, 3, 4, 5],
        RowComponent: RegularRow,
        displayImages: true,
      },
    ],
  },
  'top, regular': {
    input: {
      firstRow: [0],
      regularRows: [[1, 2, 3, 4]],
      noImageRow: [],
    },
    expected: [
      { stories: [0], RowComponent: TopRow, displayImages: true },
      {
        stories: [1, 2, 3, 4],
        RowComponent: RegularRow,
        displayImages: true,
      },
    ],
  },
  leading: {
    input: {
      firstRow: [0, 1],
      regularRows: [],
      noImageRow: [],
    },
    expected: [
      {
        stories: [0, 1],
        RowComponent: LeadingRow,
        displayImages: true,
      },
    ],
  },
  top: {
    input: {
      firstRow: [0],
      regularRows: [],
      noImageRow: [],
    },
    expected: [{ stories: [0], RowComponent: TopRow, displayImages: true }],
  },
  regular: {
    input: {
      firstRow: [],
      regularRows: [[0, 1, 2, 3]],
      noImageRow: [],
    },
    expected: [
      {
        stories: [0, 1, 2, 3],
        RowComponent: RegularRow,
        displayImages: true,
      },
    ],
  },
  'regular, regular': {
    input: {
      firstRow: [],
      regularRows: [
        [0, 1, 2, 3],
        [5, 6, 7, 8],
      ],
      noImageRow: [],
    },
    expected: [
      {
        stories: [0, 1, 2, 3],
        RowComponent: RegularRow,
        displayImages: true,
      },
      {
        stories: [5, 6, 7, 8],
        RowComponent: RegularRow,
        displayImages: true,
      },
    ],
  },
};

describe('getRows for first section', () => {
  describe('assertions', () => {
    Object.keys(rowValues).forEach((value) =>
      it(`should return right splitting for ${value} rows`, () => {
        expect(getRowDetails(rowValues[value].input)).toStrictEqual(
          rowValues[value].expected,
        );
      }),
    );
  });
});
