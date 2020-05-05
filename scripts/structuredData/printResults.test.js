const { red } = require('chalk');
const {
  printFailures,
  printPassing,
  printStatistics,
} = require('./printResults');

const constructTest = (id = 1) => {
  return {
    group: `Group ${id}`,
    description: `Description ${id}`,
    test: `Test ${id}`,
    value: `Value ${id}`,
  };
};

const constructFailure = (id = 1) => {
  return {
    ...constructTest(id),
    expected: `Expected ${id}`,
    error: {
      message: `Error Message ${id}`,
    },
  };
};

const constructResult = () => {
  return {
    urls: [],
    passed: [],
    failed: [],
    warnings: [],
    structuredData: {
      metatags: {},
    },
    schemas: [],
  };
};

describe('printResults', () => {
  beforeEach(() => {
    jest.mock('chalk', () => ({
      red: message => message,
    }));
    global.console.log = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('printFailures', () => {
    it('should not output anything if no failed tests', () => {
      printFailures([]);
      expect(global.console.log).not.toHaveBeenCalled();
    });

    it('should output details of failed test', () => {
      printFailures([constructFailure()]);
      expect(global.console.log).toHaveBeenCalledTimes(2);
      expect(global.console.log).toHaveBeenNthCalledWith(
        1,
        red('1 tests failed'),
      );
    });

    it('should output details of multiple failed tests', () => {
      printFailures([constructFailure(1), constructFailure(2)]);
      expect(global.console.log).toHaveBeenCalledTimes(3);
      expect(global.console.log).toHaveBeenNthCalledWith(
        1,
        red('2 tests failed'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('Error Message 1'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        3,
        expect.stringContaining('Error Message 2'),
      );
    });
  });

  describe('printPassing', () => {
    it('should not output anything if no passing tests', () => {
      printPassing(constructResult());
      expect(global.console.log).not.toHaveBeenCalled();
    });

    it('should output details of tests passed', () => {
      const result = { ...constructResult(), passed: [constructTest()] };
      printPassing(result);
      expect(global.console.log).toHaveBeenCalledTimes(1);
      expect(global.console.log).toBeCalledWith(
        expect.stringContaining('Test 1'),
      );
    });

    it('should output details of multiple passed tests', () => {
      const result = {
        ...constructResult(),
        passed: [constructTest(1), constructTest(2)],
      };
      printPassing(result);
      expect(global.console.log).toHaveBeenCalledTimes(2);
      expect(global.console.log).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining('Test 1'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('Test 2'),
      );
    });
  });

  describe('printStatistics', () => {
    it('should output details even if no tests executed', () => {
      printStatistics([constructResult()]);
      expect(global.console.log).toBeCalledTimes(9);
      expect(global.console.log).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining('Statistics'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('URLs: 1'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        3,
        expect.stringContaining('Metatags: 0'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        4,
        expect.stringContaining('schema.org schemas: 0'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        5,
        expect.stringContaining('Total Tests: 0'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        6,
        expect.stringContaining('Results'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        7,
        expect.stringContaining('Passed:\t0'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        8,
        expect.stringContaining('Failed:\t0'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(9, '');
    });

    it('should output aggregated test results', () => {
      const resultWithPasses = {
        ...constructResult(),
        passed: [constructTest(1), constructTest(2)],
        structuredData: {
          metatags: {
            a: 'a',
            b: 'b',
          },
        },
        schemas: ['Schema 1'],
      };

      const resultWithFailures = {
        ...constructResult(),
        failed: [constructFailure()],
        structuredData: {
          metatags: {
            b: 'b',
            c: 'c',
          },
        },
        schemas: ['Schema 2'],
      };

      const resultWithPassesAndFailures = {
        ...constructResult(),
        passed: [constructTest(1), constructTest(2), constructTest(3)],
        failed: [constructFailure(1), constructFailure(2)],
        structuredData: {
          metatags: {
            a: 'a',
            b: 'b',
            c: 'c',
            d: 'd',
          },
        },
        schemas: ['Schema 1', 'Schema 2', 'Schema 3'],
      };

      printStatistics([
        resultWithPasses,
        resultWithFailures,
        resultWithPassesAndFailures,
      ]);

      expect(global.console.log).toBeCalledTimes(9);
      expect(global.console.log).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining('Statistics'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('URLs: 3'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        3,
        expect.stringContaining('Metatags: 4'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        4,
        expect.stringContaining(
          'schema.org schemas: Schema 1, Schema 2, Schema 3',
        ),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        5,
        expect.stringContaining('Total Tests: 8'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        6,
        expect.stringContaining('Results'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        7,
        expect.stringContaining('Passed:\t5'),
      );
      expect(global.console.log).toHaveBeenNthCalledWith(
        8,
        expect.stringContaining('Failed:\t3'),
      );
    });
  });
});
