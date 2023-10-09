import Cookie from 'js-cookie';
import {
  getCookiePolicy,
  getPreferredVariant,
  setPreferredVariantCookie,
  personalisationEnabled,
} from '.';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';
const cookieGetterSpy = jest.spyOn(Cookie, 'get');
const cookieSetterSpy = jest.spyOn(Cookie, 'set');

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

  describe('getPreferredVariant', () => {
    it('should return null if service is null', () => {
      // @ts-expect-error - we are testing null service
      expect(getPreferredVariant()).toEqual(null);
    });

    it('should return cookie value from js-cookie', () => {
      Cookie.set('ckps_chinese', 'trad');
      expect(getPreferredVariant('zhongwen')).toEqual('trad');
    });

    it('should get a cookie using check ckps_chinese for zhongwen', () => {
      Cookie.set('ckps_chinese', 'trad');
      getPreferredVariant('zhongwen');
      expect(cookieGetterSpy).toBeCalledWith('ckps_chinese');
    });

    it('should get a cookie using check ckps_chinese for ukchina', () => {
      Cookie.set('ckps_ukchina', 'trad');
      getPreferredVariant('ukchina');
      expect(cookieGetterSpy).toBeCalledWith('ckps_chinese');
    });

    it('should get a cookie using check ckps_serbian for serbian', () => {
      Cookie.set('ckps_serbian', 'lat');
      getPreferredVariant('serbian');
      expect(cookieGetterSpy).toBeCalledWith('ckps_serbian');
    });
  });

  describe('setPreferredVariant', () => {
    it('should not set invalid service or variant', () => {
      Cookie.set(POLICY_COOKIE, '111');
      cookieSetterSpy.mockClear();
      // @ts-expect-error - we are testing null variant
      setPreferredVariantCookie('news', '');
      expect(cookieSetterSpy).not.toHaveBeenCalled();
      // @ts-expect-error - we are testing null service and not passing in a variant
      setPreferredVariantCookie('');
      expect(cookieSetterSpy).not.toHaveBeenCalled();
      // @ts-expect-error - we are testing not passing in a variant
      setPreferredVariantCookie('news');
      expect(cookieSetterSpy).not.toHaveBeenCalled();
      // @ts-expect-error - we are testing not passing in a service and variant
      setPreferredVariantCookie();
      expect(cookieSetterSpy).not.toHaveBeenCalled();
    });

    it('should set preferred variant if personalisation cookies enabled', () => {
      Cookie.set(POLICY_COOKIE, '111');
      // @ts-expect-error - we are testing a test service and variant
      setPreferredVariantCookie('foo', 'bar');
      expect(cookieSetterSpy).toHaveBeenCalledWith('ckps_foo', 'bar', {
        domain: '.bbc.com',
        expires: 7,
        sameSite: 'Lax',
      });
    });

    it('should not set preferred variant if personalisation cookies not enabled', () => {
      Cookie.set(POLICY_COOKIE, '110');
      cookieSetterSpy.mockClear();
      setPreferredVariantCookie('serbian', 'lat');
      expect(cookieSetterSpy).not.toHaveBeenCalled();

      Cookie.set(POLICY_COOKIE, '100');
      cookieSetterSpy.mockClear();
      setPreferredVariantCookie('serbian', 'lat');
      expect(cookieSetterSpy).not.toHaveBeenCalled();

      Cookie.set(POLICY_COOKIE, '000');
      cookieSetterSpy.mockClear();
      setPreferredVariantCookie('serbian', 'lat');
      expect(cookieSetterSpy).not.toHaveBeenCalled();
    });

    it('should set ckps_serbian for serbian', () => {
      Cookie.set(POLICY_COOKIE, '111');
      setPreferredVariantCookie('serbian', 'lat');
      expect(cookieSetterSpy).toHaveBeenCalledWith('ckps_serbian', 'lat', {
        domain: '.bbc.com',
        expires: 7,
        sameSite: 'Lax',
      });
    });

    it('should set ckps_chinese for zhongwen', () => {
      Cookie.set(POLICY_COOKIE, '111');
      setPreferredVariantCookie('zhongwen', 'simp');
      expect(cookieSetterSpy).toHaveBeenCalledWith('ckps_chinese', 'simp', {
        domain: '.bbc.com',
        expires: 7,
        sameSite: 'Lax',
      });
    });

    it('should set ckps_chinese for ukchina', () => {
      Cookie.set(POLICY_COOKIE, '111');
      setPreferredVariantCookie('ukchina', 'simp');
      expect(cookieSetterSpy).toHaveBeenCalledWith('ckps_chinese', 'simp', {
        domain: '.bbc.com',
        expires: 7,
        sameSite: 'Lax',
      });
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
