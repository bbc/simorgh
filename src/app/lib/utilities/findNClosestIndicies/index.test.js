import findNClosestIndices from '.';

const tests = [
  {
    name: 'n = 0',
    array: [true],
    predicate: Boolean,
    startingIndex: 0,
    n: 0,
    expectedResult: [],
  },
  {
    name: 'no matching element',
    array: [false],
    predicate: Boolean,
    startingIndex: 0,
    n: 1,
    expectedResult: [],
  },
  {
    name: 'one matching element in position 0',
    array: [true],
    predicate: Boolean,
    startingIndex: 0,
    n: 1,
    expectedResult: [0],
  },
  {
    name: 'n > matching elements',
    array: [true],
    predicate: Boolean,
    startingIndex: 0,
    n: 2,
    expectedResult: [0],
  },
  {
    name: 'matching elements > n',
    array: [true, true],
    predicate: Boolean,
    startingIndex: 0,
    n: 1,
    expectedResult: [0],
  },
  {
    name: 'returns multiple indices - case A',
    array: [true, true],
    predicate: Boolean,
    startingIndex: 0,
    n: 2,
    expectedResult: [0, 1],
  },
  {
    name: 'returns multiple indices - case B',
    array: [false, true, true],
    predicate: Boolean,
    startingIndex: 0,
    n: 2,
    expectedResult: [1, 2],
  },
  {
    name: 'returns multiple indices - case C',
    array: [false, true, true],
    predicate: Boolean,
    startingIndex: 2,
    n: 2,
    expectedResult: [1, 2],
  },
  {
    name: 'searches bidirectionally',
    array: [true, false, true],
    predicate: Boolean,
    startingIndex: 1,
    n: 2,
    expectedResult: [0, 2],
  },
  {
    name: 'prefers left elements when number of found elements > n',
    array: [true, false, true],
    predicate: Boolean,
    startingIndex: 1,
    n: 1,
    expectedResult: [0],
  },
];

describe('findNClosestIndicies', () => {
  it('returns correct results', () => {
    tests.forEach(({ expectedResult, name, ...args }) => {
      expect(findNClosestIndices(args)).toEqual(expectedResult);
    });
  });
});
