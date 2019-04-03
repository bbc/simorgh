import getOrigin from './getOrigin';
import getEnv from './getEnv';
import getHref from './getHref';
import getReferrer from './getReferrer';
import getArticleId from './getArticleId';

let getOriginValue = 'getOriginValue';
const getEnvValue = 'getEnv';
const getHrefValue = 'getHref';
const getReferrerValue = 'getReferrer';
const getArticleIdValue = 'getArticleId';

jest.mock('./getOrigin', () => jest.fn());
getOrigin.mockImplementation(() => getOriginValue);

jest.mock('./getEnv', () => jest.fn());
getEnv.mockImplementation(() => getEnvValue);

jest.mock('./getHref', () => jest.fn());
getHref.mockImplementation(() => getHrefValue);

jest.mock('./getReferrer', () => jest.fn());
getReferrer.mockImplementation(() => getReferrerValue);

jest.mock('./getArticleId', () => jest.fn());
getArticleId.mockImplementation(() => getArticleIdValue);

const getOriginContext = require('./index').default;

describe('getOriginContext', () => {
  it('return the expected output', () => {
    const output = getOriginContext('bbcOrigin', 'service', 'articleData');

    expect(getOrigin).toHaveBeenCalledWith('bbcOrigin');
    expect(getEnv).toHaveBeenCalledWith('getOriginValue');
    expect(getHref).toHaveBeenCalledWith(
      'getOriginValue',
      'service',
      'getArticleId',
    );
    expect(getReferrer).toHaveBeenCalled();
    expect(getArticleId).toHaveBeenCalledWith('articleData');

    expect(output).toEqual({
      env: 'getEnv',
      href: 'getHref',
      isUK: true,
      origin: 'getOriginValue',
      referrer: 'getReferrer',
    });
  });

  it('should return the expected output', () => {
    const output = getOriginContext('bbcOrigin', 'service', 'articleData');

    expect(getOrigin).toHaveBeenCalledWith('bbcOrigin');
    expect(getEnv).toHaveBeenCalledWith('getOriginValue');
    expect(getHref).toHaveBeenCalledWith(
      'getOriginValue',
      'service',
      'getArticleId',
    );
    expect(getReferrer).toHaveBeenCalled();
    expect(getArticleId).toHaveBeenCalledWith('articleData');

    expect(output).toEqual({
      env: 'getEnv',
      href: 'getHref',
      isUK: true,
      origin: 'getOriginValue',
      referrer: 'getReferrer',
    });
  });

  describe('isUK', () => {
    it('should return false if origin value does not include .com', () => {
      getOriginValue = 'https://www.bbc.org';

      const output = getOriginContext('bbcOrigin', 'service', 'articleData');

      expect(output.isUK).toEqual(true);
    });

    it('should return true if origin value includes .com', () => {
      getOriginValue = 'https://www.bbc.com';

      const output = getOriginContext('bbcOrigin', 'service', 'articleData');

      expect(output.isUK).toEqual(false);
    });
  });
});
