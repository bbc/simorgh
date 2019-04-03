import getOrigin from './getOrigin';
import getEnv from './getEnv';

let getOriginValue = 'getOriginValue';
const getEnvValue = 'getEnv';

jest.mock('./getOrigin', () => jest.fn());
getOrigin.mockImplementation(() => getOriginValue);

jest.mock('./getEnv', () => jest.fn());
getEnv.mockImplementation(() => getEnvValue);

const getOriginContext = require('./index').default;

describe('getOriginContext', () => {
  it('return the expected output', () => {
    const output = getOriginContext('bbcOrigin', 'service', 'articleData');

    expect(getOrigin).toHaveBeenCalledWith('bbcOrigin');
    expect(getEnv).toHaveBeenCalledWith('getOriginValue');

    expect(output).toEqual({
      env: 'getEnv',
      isUK: true,
      origin: 'getOriginValue',
    });
  });

  it('should return the expected output', () => {
    const output = getOriginContext('bbcOrigin', 'service', 'articleData');

    expect(getOrigin).toHaveBeenCalledWith('bbcOrigin');
    expect(getEnv).toHaveBeenCalledWith('getOriginValue');

    expect(output).toEqual({
      env: 'getEnv',
      isUK: true,
      origin: 'getOriginValue',
    });
  });

  describe('isUK', () => {
    it('should return false if origin value does not include .com', () => {
      getOriginValue = 'https://www.bbc.org';

      const output = getOriginContext('bbcOrigin');

      expect(output.isUK).toEqual(true);
    });

    it('should return true if origin value includes .com', () => {
      getOriginValue = 'https://www.bbc.com';

      const output = getOriginContext('bbcOrigin');

      expect(output.isUK).toEqual(false);
    });
  });
});
