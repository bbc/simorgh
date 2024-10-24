fetch.mockImplementation(() => ({ text: () => '<html amp></html>' }));
const log = jest.spyOn(global.console, 'log');
log.mockImplementation(jest.fn);
const error = jest.spyOn(global.console, 'error');
error.mockImplementation(jest.fn);

const { getPageString, printResult, printSummary, validate } = require('.');

describe('amp validator tests', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should print a passing test with the right console methods', () => {
    const result = {
      status: 'PASS',
      errors: [],
      url: 'mock-url',
    };
    printResult(result);
    expect(log).toHaveBeenNthCalledWith(1, 'mock-url');
    expect(log).toHaveBeenNthCalledWith(2, 'PASS');
    expect(log).toHaveBeenNthCalledWith(3, '\n');
  });

  it('should print a failing test with the right console methods', () => {
    const result = {
      status: 'FAIL',
      errors: [
        {
          line: 2,
          col: 5,
          message: 'an error',
          severity: 'ERROR',
          specUrl: 'https://amp.dev/docs',
        },
      ],
      url: 'mock-url',
    };
    printResult(result);
    expect(error).toHaveBeenNthCalledWith(1, 'mock-url');
    expect(error).toHaveBeenNthCalledWith(2, 'FAIL');
    expect(error).toHaveBeenNthCalledWith(
      3,
      'line 2, col 5: an error (see https://amp.dev/docs)',
    );
    expect(log).toHaveBeenNthCalledWith(4, '\n');
  });

  it('should print a summary of results', () => {
    const results = [
      { status: 'FAIL' },
      { status: 'FAIL' },
      { status: 'PASS' },
      { status: 'FAIL' },
      { status: 'PASS' },
    ];
    printSummary(results);
    expect(log).toHaveBeenNthCalledWith(5, 'Passed: 2');
    expect(log).toHaveBeenNthCalledWith(6, 'Failed: 3');
  });

  it('should get the page string', async () => {
    const string = await getPageString('mock-url');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(string).toEqual('<html amp></html>');
  });

  it('should validate a url', async () => {
    const validateString = jest.fn(() => ({ status: 'PASS' }));
    const validator = jest.fn(() => ({ validateString }))();
    const result = await validate({ validator, url: 'mock-url' });
    const expectedResult = { status: 'PASS', url: 'mock-url' };

    expect(result).toEqual(expectedResult);
    expect(validateString).toHaveBeenCalledWith('<html amp></html>');
  });
});
