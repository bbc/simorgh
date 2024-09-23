import Cookie from 'js-cookie';
import { getCookiePolicy, personalisationEnabled } from '.';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';

beforeEach(() => {
  jest.clearAllMocks();
  Cookie.remove(PRIVACY_COOKIE);
  Cookie.remove(EXPLICIT_COOKIE);
  Cookie.remove(POLICY_COOKIE);
});

describe('UserContext cookies', () => {
  describe('getCookiePolicy', () => {
    it('should return cookie value from js-cookie', () => {
      Cookie.set(POLICY_COOKIE, '111');
      expect(getCookiePolicy()).toEqual('111');
    });

    it('should return cookie value from js-cookie', () => {
      Cookie.set(POLICY_COOKIE, 'abcdefg');
      expect(getCookiePolicy()).toEqual('abcdefg');
    });

    it('should default to "000" if cookie value isnt set', () => {
      Cookie.remove(POLICY_COOKIE);
      expect(getCookiePolicy()).toEqual('000');
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(personalisationEnabled(cookiePolicy))[result]());
    });
  });
});
