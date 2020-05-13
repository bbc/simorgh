const fs = require('fs');
const {
  logRow,
  getCategoryScores,
  isAboveThreshold,
  compareToBudget,
  readReport,
  exitResult,
} = require('./lighthouseBudget');

jest.mock('fs');

global.console = {
  warn: jest.fn(),
  log: jest.fn(),
  table: jest.fn(),
};

global.JSON = {
  parse: jest.fn(),
};

const resultMock = (ally, bestPractises, seo) => ({
  ally,
  bestPractises,
  seo,
});

const data = {
  categories: {
    performance: {
      id: 'performance',
      score: 0.92,
    },
    accessibility: {
      id: 'accessibility',
      score: 1.0,
    },
    'best-practices': {
      id: 'best-practices',
      score: 0.41,
    },
    seo: {
      id: 'seo',
      score: 0.5,
    },
    pwa: {
      id: 'pwa',
      score: 0.7,
    },
  },
};

const testCategories = ['seo', 'bestPractises', 'ally'];

const testBudget = {
  ally: 100,
  bestPractises: 62,
  seo: 0,
};

test('Log row returns the correct object', () => {
  const expected = {
    category: 'category',
    scoreValue: 40,
    budgetValue: 50,
    result: 'fail',
  };
  const result = logRow('category', 40, 50, 'fail');

  expect(result).toStrictEqual(expected);
});

test('getCategoryScores grabs the 3 categories and returns a percentage', () => {
  const result = getCategoryScores(data);

  expect(result.ally).toEqual(100);
  expect(result.bestPractises).toEqual(41);
  expect(result.seo).toEqual(50);
});

describe('isAboveThreshold', () => {
  test('If score is above the budget return true', () => {
    const result = isAboveThreshold(60, 50);
    expect(result).toEqual(true);
  });
  test('If score equals the budget return true', () => {
    const result = isAboveThreshold(50, 50);
    expect(result).toEqual(true);
  });
  test('If the score is below the budget reutnr false', () => {
    const result = isAboveThreshold(10, 100);
    expect(result).toEqual(false);
  });
});

const budgetTest = (title, scores, expectedResult) => {
  test(title, () => {
    const result = compareToBudget(testCategories, scores, testBudget);

    expect(result).toEqual(expectedResult);
  });
};

describe('compareToBudget', () => {
  budgetTest(
    'Returns true if all values are above a threshold',
    resultMock(100, 80, 20),
    true,
  );
  budgetTest(
    'Returns false if one or more values are wrong',
    resultMock(90, 80, 20),
    false,
  );
  test('The function prints the result to console.table', () => {
    expect(global.console.table).toBeCalled();
  });
});

test('readReport reads a file and parses it to Json', () => {
  readReport();

  expect(fs.readFileSync).toBeCalled();
  expect(global.JSON.parse).toBeCalled();
});

test('exitResult', () => {
  const mockExit = jest
    .spyOn(process, 'exit')
    .mockImplementation((number) => number);

  exitResult(false);

  expect(mockExit).toBeCalled();
});
