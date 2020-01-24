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
      { row: [0], rowType: TopRow, storyTypes: ['top'], displayImages: true },
      {
        row: [1, 2, 3, 4],
        rowType: RegularRow,
        storyTypes: ['regular', 'regular', 'regular', 'regular'],
        displayImages: true,
      },
      {
        row: [5, 6, 7, 8],
        rowType: RegularRow,
        storyTypes: ['regular', 'regular', 'regular', 'regular'],
        displayImages: true,
      },
      {
        row: [9, 10, 11, 12],
        rowType: RegularRow,
        storyTypes: ['regular', 'regular', 'regular', 'regular'],
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
        row: [0, 1],
        rowType: LeadingRow,
        storyTypes: ['leading', 'regular'],
        displayImages: true,
      },
      {
        row: [2, 3, 4, 5],
        rowType: RegularRow,
        storyTypes: ['regular', 'regular', 'regular', 'regular'],
        displayImages: true,
      },
      {
        row: [6, 7, 8, 9],
        rowType: RegularRow,
        storyTypes: ['regular', 'regular', 'regular', 'regular'],
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
        row: [0, 1],
        rowType: LeadingRow,
        storyTypes: ['leading', 'regular'],
        displayImages: true,
      },
      {
        row: [2, 3, 4, 5],
        rowType: RegularRow,
        storyTypes: ['regular', 'regular', 'regular', 'regular'],
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
      { row: [0], rowType: TopRow, storyTypes: ['top'], displayImages: true },
      {
        row: [1, 2, 3, 4],
        rowType: RegularRow,
        storyTypes: ['regular', 'regular', 'regular', 'regular'],
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
        row: [0, 1],
        rowType: LeadingRow,
        storyTypes: ['leading', 'regular'],
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
    expected: [
      { row: [0], rowType: TopRow, storyTypes: ['top'], displayImages: true },
    ],
  },
  regular: {
    input: {
      topRow: [],
      regularRows: [[0, 1, 2, 3]],
      noImageRow: [],
    },
    expected: [
      {
        row: [0, 1, 2, 3],
        rowType: RegularRow,
        storyTypes: ['regular', 'regular', 'regular', 'regular'],
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
        row: [0, 1, 2, 3],
        rowType: RegularRow,
        storyTypes: ['regular', 'regular', 'regular', 'regular'],
        displayImages: true,
      },
      {
        row: [5, 6, 7, 8],
        rowType: RegularRow,
        storyTypes: ['regular', 'regular', 'regular', 'regular'],
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
