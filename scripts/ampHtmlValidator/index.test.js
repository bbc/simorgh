const fetch = require('isomorphic-fetch');

jest.mock('../../cypress/support/helpers/getPageUrls', () => {
  return {
    getPageUrls: () => [['/amharic/bbc_amharic_radio/liveradio']],
  };
});
jest.mock('isomorphic-fetch');
fetch.mockImplementation(() => ({ text: () => '<html amp></html>' }));
const log = jest.spyOn(global.console, 'log');
log.mockImplementation(jest.fn);
const error = jest.spyOn(global.console, 'error');
error.mockImplementation(jest.fn);

const {
  getPageString,
  printResult,
  printSummary,
  validate,
  runValidator,
} = require('.');

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

  it('should print passes when verbose is true', async () => {
    fetch.mockImplementation(() => ({
      text: () => `<!doctype html>
    <html ⚡>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <meta name="description" content="This is the AMP Boilerplate.">
        <link rel="preload" as="script" href="https://cdn.ampproject.org/v0.js">
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <!-- Import other AMP Extensions here -->
        <style amp-custom>
        /* Add your styles here */
        </style>
        <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    
        <link rel="canonical" href=".">
        <title>My AMP Page</title>
      </head>
      <body>
        <h1>Hello World</h1>
      </body>
    </html>`,
    }));
    await runValidator(true);
    expect(log).toBeCalledTimes(35);
  });
});
