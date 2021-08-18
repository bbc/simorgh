/* eslint-disable no-console */
import setCookieOven from './setCookieOven';

const { origin } = window.location;
delete window.location;

beforeEach(() => {
  window.location = new URL(origin);
});

describe('setCookieOven', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should hit the correct endpoint when on localhost', () => {
    setCookieOven('value');

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost/cookieoven?policy=value',
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should hit the correct outside UK and UK cookie oven endpoints when on the test environment', () => {
    window.location = new URL('https://www.test.bbc.com');

    setCookieOven('value');

    const [[outsideUkEndpoint], [ukEndpoint]] = fetch.mock.calls;

    expect(outsideUkEndpoint).toBe(
      'https://www.test.bbc.com/cookieoven?policy=value',
    );
    expect(ukEndpoint).toBe(
      'https://www.test.bbc.co.uk/cookieoven?policy=value',
    );
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should hit the correct outside UK and UK cookie oven endpoints when on the live environment', () => {
    window.location = new URL('https://www.bbc.com');

    setCookieOven('value');

    const [[outsideUkEndpoint], [ukEndpoint]] = fetch.mock.calls;

    expect(outsideUkEndpoint).toBe(
      'https://www.bbc.com/cookieoven?policy=value',
    );
    expect(ukEndpoint).toBe('https://www.bbc.co.uk/cookieoven?policy=value');
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  describe('when the fetch fails', () => {
    const { error: consoleError } = console;

    afterEach(() => {
      console.error = consoleError;
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should send error to console when logger function isn't provided", async () => {
      const error = new Error('An error');

      console.error = jest.fn();
      global.fetch = jest.fn(() => Promise.reject(error));

      await setCookieOven('value');

      expect(console.error).toHaveBeenCalledWith(error);
    });

    it('should send error to logger function when provided', async () => {
      const error = new Error('An error');

      global.fetch = jest.fn(() => Promise.reject(error));

      const logger = { error: jest.fn() };

      await setCookieOven('value', logger);

      expect(logger.error).toHaveBeenCalledWith(error);
    });
  });
});
