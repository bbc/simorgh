/* eslint-disable global-require */
import loggerMock from '#testHelpers/loggerMock';

let fetchResponse;
let isOnClient;

describe('sendBeacon', () => {
  beforeEach(() => {
    isOnClient = true;
    fetch.mockImplementation(() => fetchResponse);
    jest.mock('../../utilities/onClient', () => jest.fn());
    const onClient = require('../../utilities/onClient');
    onClient.mockImplementation(() => isOnClient);
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it(`should fetch`, () => {
    const sendBeacon = require('./index').default;

    sendBeacon('https://foobar.com');

    expect(fetch).toHaveBeenCalledWith('https://foobar.com', {
      credentials: 'include',
    });
  });

  it(`should not fetch when not on client`, () => {
    isOnClient = false;

    const sendBeacon = require('./index').default;

    sendBeacon('https://foobar.com');

    expect(fetch).not.toHaveBeenCalled();
  });

  describe('when the fetch fails', () => {
    let newError;
    beforeEach(() => {
      newError = new Error();
      fetchResponse = Promise.reject(newError);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it(`should send error to logger`, async () => {
      const sendBeacon = require('./index').default;

      await sendBeacon('https://foobar.com');

      expect(loggerMock.error).toHaveBeenCalledWith('analytics_beacon_error', {
        error: newError,
      });
    });
  });
});
