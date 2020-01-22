import Cookie from 'js-cookie';
import {
  getCookiePolicy,
  getPreferredVariant,
  personalisationEnabled,
} from '.';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

describe('UserContext cookies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCookiePolicy', () => {
    it('should return cookie value from js-cookie', () => {
      Cookie.get.mockReturnValue('111');
      expect(getCookiePolicy()).toEqual('111');
    });

    it('should return cookie value from js-cookie', () => {
      Cookie.get.mockReturnValue('abcdefg');
      expect(getCookiePolicy()).toEqual('abcdefg');
    });

    it('should default to "000" if cookie value isnt set', () => {
      Cookie.get.mockReturnValue(null);
      expect(getCookiePolicy()).toEqual('000');
    });

    it('should default to "000" if cookie value isnt set', () => {
      Cookie.get.mockReturnValue(undefined);
      expect(getCookiePolicy()).toEqual('000');
    });
  });

  describe('getPreferredVariant', () => {
    it('should return null if service is null', () => {
      expect(getPreferredVariant()).toEqual(null);
    });

    it('should return cookie value from js-cookie', () => {
      Cookie.get.mockReturnValue('trad');
      expect(getPreferredVariant('zhongwen')).toEqual('trad');
    });
  });

  describe('personalisationEnabled', () => {
    [
      {
        test: 'when last character is 1',
        cookiePolicy: '111',
        result: 'toBeTruthy',
      },
      {
        test: 'when last character is 1',
        cookiePolicy: '001',
        result: 'toBeTruthy',
      },
      {
        test: 'when last character is 0',
        cookiePolicy: '110',
        result: 'toBeFalsy',
      },
      {
        test: 'when cookiePolicy is null',
        cookiePolicy: null,
        result: 'toBeFalsy',
      },
      {
        test: 'when cookiePolicy is undefined',
        cookiePolicy: undefined,
        result: 'toBeFalsy',
      },
      {
        test: 'when cookiePolicy is less than 3 characters',
        cookiePolicy: '11',
        result: 'toBeFalsy',
      },
      {
        test: 'when cookiePolicy is more than 3 characters',
        cookiePolicy: '1111',
        result: 'toBeFalsy',
      },
      {
        test: 'when last character is not 1 or 0',
        cookiePolicy: '11a',
        result: 'toBeFalsy',
      },
    ].forEach(({ test, cookiePolicy, result }) => {
      it(`expect ${result} ${test}`, () =>
        expect(personalisationEnabled(cookiePolicy))[result]());
    });
  });
});
