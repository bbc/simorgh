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

  it('should hit the correct outside UK and UK cookie oven endpoints when on localhost', () => {
    setCookieOven('value');

    const [[outsideUkEndpoint], [ukEndpoint]] = fetch.mock.calls;

    expect(outsideUkEndpoint).toBe('http://localhost/cookieoven?policy=value');
    expect(ukEndpoint).toBe('http://localhost/cookieoven?policy=value');
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
  });

  it('should hit the correct outside UK and UK cookie oven endpoints when on the live environment', () => {
    window.location = new URL('https://www.bbc.com');

    setCookieOven('value');

    const [[outsideUkEndpoint], [ukEndpoint]] = fetch.mock.calls;

    expect(outsideUkEndpoint).toBe(
      'https://www.bbc.com/cookieoven?policy=value',
    );
    expect(ukEndpoint).toBe('https://www.bbc.co.uk/cookieoven?policy=value');
  });

  describe('when the fetch fails', () => {
    let error;

    beforeEach(() => {
      error = new Error('An error');
      // fetchResponse = Promise.reject(error);
      global.console = { error: jest.fn() };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should send error to console when logger function isn't provided", async () => {
      global.fetch = jest.fn(() => Promise.reject(error));

      await setCookieOven('value');

      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(error);
    });

    it('should send error to logger function when provided', async () => {
      global.fetch = jest.fn(() => Promise.reject(error));

      const logger = { error: jest.fn() };

      await setCookieOven('value', logger);

      expect(logger.error).toHaveBeenCalledWith(error);
    });
  });
});
