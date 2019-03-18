/* eslint-disable global-require */
let fetchResponse;
let cookieOvenUrl;

describe('setCookieOven', () => {
  beforeEach(() => {
    jest.mock('./cookieOvenUrl', () => jest.fn());
    cookieOvenUrl = require('./cookieOvenUrl');
    cookieOvenUrl.mockImplementation(() => 'https://cookieOvenUrl.com');

    fetch.mockImplementation(() => fetchResponse);
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it(`should fetch`, () => {
    const setCookieOven = require('./setCookieOven').default;

    setCookieOven('cookie', 'value');

    expect(cookieOvenUrl).toHaveBeenCalledWith('http://localhost');
    expect(fetch).toHaveBeenCalledWith(
      'https://cookieOvenUrl.com/cookie/value',
    );
  });

  describe('when the fetch fails', () => {
    let error;

    beforeEach(() => {
      error = new Error('An error');
      fetchResponse = Promise.reject(error);
      global.console = { error: jest.fn() };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it(`should send error to console when logger function isn't provided`, async () => {
      const setCookieOven = require('./setCookieOven').default;

      await setCookieOven('cookie', 'value');

      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(error);
    });

    it(`should send error to logger function when provided`, async () => {
      const logger = { error: jest.fn() };

      const setCookieOven = require('./setCookieOven').default;

      await setCookieOven('cookie', 'value', logger);

      expect(logger.error).toHaveBeenCalledWith(error);
    });
  });
});
