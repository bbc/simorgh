/* eslint-disable global-require */
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import Cookies from 'js-cookie';

import useConsentBanners from '.';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';
const DEFAULT_PRIVACY_COOKIE = 'july2019';
const DEFAULT_EXPLICIT_COOKIE = '1';
const DEFAULT_POLICY_COOKIE = '111';

const cookieSetterSpy = jest.spyOn(Cookies, 'set');

beforeAll(() => {
  const { location } = window;
  delete global.window.location;
  global.window.location = { ...location };
});

beforeEach(() => {
  global.window.location = new URL('https://www.bbc.com');
  Cookies.set(PRIVACY_COOKIE, DEFAULT_PRIVACY_COOKIE);
  Cookies.set(EXPLICIT_COOKIE, DEFAULT_EXPLICIT_COOKIE);
  Cookies.set(POLICY_COOKIE, DEFAULT_POLICY_COOKIE);
});

afterAll(() => {
  const { location } = window;
  delete global.window.location;
  global.window.location = { ...location };
});

describe('useConsentBanners', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on initial mount', () => {
    it('should return showPrivacyBanner=FALSE when PRIVACY_COOKIE is current policy value', () => {
      Cookies.set(PRIVACY_COOKIE, DEFAULT_PRIVACY_COOKIE);
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners());

      expect(result.current.showPrivacyBanner).toBe(false);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should return showPrivacyBanner=FALSE when PRIVACY_COOKIE is anythingelse', () => {
      Cookies.set(PRIVACY_COOKIE, 'anythingelse');
      cookieSetterSpy.mockClear();
      const { result } = renderHook(() => useConsentBanners());

      expect(result.current.showPrivacyBanner).toBe(false);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('sets PRIVACY_COOKIE and returns showPrivacyBanner=TRUE when PRIVACY_COOKIE is 0', () => {
      Cookies.set(PRIVACY_COOKIE, '0');
      cookieSetterSpy.mockClear();
      const { result } = renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        DEFAULT_PRIVACY_COOKIE,
        {
          expires: 365,
          domain: '.bbc.com',
          sameSite: 'None',
          secure: true,
        },
      );
      expect(result.current.showPrivacyBanner).toBe(true);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('sets PRIVACY_COOKIE and returns showPrivacyBanner=TRUE when PRIVACY_COOKIE is 1', () => {
      Cookies.set(PRIVACY_COOKIE, '1');
      cookieSetterSpy.mockClear();
      const { result } = renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        DEFAULT_PRIVACY_COOKIE,
        {
          expires: 365,
          domain: '.bbc.com',
          sameSite: 'None',
          secure: true,
        },
      );
      expect(result.current.showPrivacyBanner).toBe(true);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('sets PRIVACY_COOKIE and returns showPrivacyBanner=TRUE when cookie is null', () => {
      Cookies.set(PRIVACY_COOKIE, null);
      cookieSetterSpy.mockClear();
      const { result } = renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        DEFAULT_PRIVACY_COOKIE,
        {
          expires: 365,
          domain: '.bbc.com',
          sameSite: 'None',
          secure: true,
        },
      );
      expect(result.current.showPrivacyBanner).toBe(true);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('sets PRIVACY_COOKIE without domain restrictions', () => {
      global.window.location = new URL('https://www.bbc.co.uk');
      Cookies.set(PRIVACY_COOKIE, null);
      cookieSetterSpy.mockClear();

      renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        DEFAULT_PRIVACY_COOKIE,
        {
          expires: 365,
          domain: '.bbc.co.uk',
          sameSite: 'None',
          secure: true,
        },
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should return showCookieBanner=FALSE when EXPLICIT_COOKIE is 1 or 2', () => {
      ['1', '2'].forEach(value => {
        Cookies.set(EXPLICIT_COOKIE, value);
        cookieSetterSpy.mockClear();

        const { result } = renderHook(() => useConsentBanners());

        expect(cookieSetterSpy).toHaveBeenCalledTimes(0);
        expect(result.current.showCookieBanner).toBe(false);
        expect(fetch).not.toHaveBeenCalled();
      });
    });

    it('should return showCookieBanner=TRUE when EXPLICIT_COOKIE is 0 and PRIVACY_COOKIE is set', () => {
      Cookies.set(EXPLICIT_COOKIE, '0');
      Cookies.set(PRIVACY_COOKIE, DEFAULT_PRIVACY_COOKIE);
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledTimes(0);
      expect(result.current.showPrivacyBanner).toBe(false);
      expect(result.current.showCookieBanner).toBe(true);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('sets POLICY_COOKIE when it is not set', () => {
      Cookies.remove(POLICY_COOKIE);
      cookieSetterSpy.mockClear();

      renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
        domain: '.bbc.com',
        sameSite: 'None',
        secure: true,
      });
      expect(cookieSetterSpy).toHaveBeenCalledTimes(1);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('does not set POLICY_COOKIE when its already set', () => {
      cookieSetterSpy.mockClear();

      renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).not.toHaveBeenCalledWith(
        POLICY_COOKIE,
        expect.anything(),
        expect.anything(),
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should return showCookieBanner=TRUE when EXPLICIT_COOKIE is 0 and sets POLICY_COOKIE when cookie is null', () => {
      Cookies.set(EXPLICIT_COOKIE, '0');
      Cookies.set(POLICY_COOKIE, null);
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledTimes(1);
      expect(cookieSetterSpy).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
        domain: '.bbc.com',
        sameSite: 'None',
        secure: true,
      });
      expect(result.current.showCookieBanner).toBe(true);
      expect(result.current.showPrivacyBanner).toBe(false);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('sets POLICY_COOKIE without domain restrictions', () => {
      global.window.location = new URL('https://www.test.bbc.com');
      Cookies.set(EXPLICIT_COOKIE, '0');
      Cookies.set(POLICY_COOKIE, null);
      cookieSetterSpy.mockClear();

      renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
        domain: '.bbc.com',
        sameSite: 'None',
        secure: true,
      });
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe('handlePrivacyBannerAccepted', () => {
    it('should return showPrivacyBanner=FALSE when handlePrivacyBannerAccepted is triggered', () => {
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners());

      act(() => {
        result.current.handlePrivacyBannerAccepted();
      });

      expect(result.current.showPrivacyBanner).toBe(false);
      expect(result.current.showCookieBanner).toBe(true);
      expect(cookieSetterSpy).not.toHaveBeenCalled();
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe('handleCookieBannerAccepted', () => {
    it('should return showCookieBanner=FALSE and showPrivacyBanner=FALSE, sets EXPLICIT_COOKIE to 1 and sets POLICY_COOKIE to 111 when handleCookieBannerAccepted is triggered', () => {
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners());

      act(() => {
        result.current.handleCookieBannerAccepted();
      });

      expect(result.current.showCookieBanner).toBe(false);
      expect(result.current.showPrivacyBanner).toBe(false);
      expect(Cookies.get(EXPLICIT_COOKIE)).toBe('1');
      expect(Cookies.get(POLICY_COOKIE)).toBe('111');
      expect(fetch).toHaveBeenCalledWith(
        'https://www.bbc.com/cookieoven?policy=111',
      );
      expect(fetch).toHaveBeenCalledWith(
        'https://www.bbc.co.uk/cookieoven?policy=111',
      );
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('should set EXPLICIT_COOKIE to 1 for requests made within the UK', () => {
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners(true));

      act(() => {
        result.current.handleCookieBannerAccepted();
      });

      expect(cookieSetterSpy).toHaveBeenCalledWith(EXPLICIT_COOKIE, '1', {
        domain: '.bbc.com',
        expires: 365,
        sameSite: 'None',
        secure: true,
      });
    });

    it('should set EXPLICIT_COOKIE to 2 for requests made outside the UK', () => {
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners(false));

      act(() => {
        result.current.handleCookieBannerAccepted();
      });

      expect(cookieSetterSpy).toHaveBeenCalledWith(EXPLICIT_COOKIE, '2', {
        domain: '.bbc.com',
        expires: 365,
        sameSite: 'None',
        secure: true,
      });
    });
  });

  describe('handleCookieBannerRejected', () => {
    it('should return showCookieBanner=FALSE and showPrivacyBanner=FALSE, sets EXPLICIT_COOKIE to 1 and does not set POLICY_COOKIE when handleCookieBannerRejected is triggered', () => {
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners());

      act(() => {
        result.current.handleCookieBannerRejected();
      });

      expect(result.current.showCookieBanner).toBe(false);
      expect(result.current.showPrivacyBanner).toBe(false);
      expect(Cookies.get(EXPLICIT_COOKIE)).toBe('1');
      expect(cookieSetterSpy).not.toHaveBeenCalledWith(
        POLICY_COOKIE,
        expect.anything(),
        expect.anything(),
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should set EXPLICIT_COOKIE to 1 for requests made within the UK', () => {
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners(true));

      act(() => {
        result.current.handleCookieBannerRejected();
      });

      expect(cookieSetterSpy).toHaveBeenCalledWith(EXPLICIT_COOKIE, '1', {
        domain: '.bbc.com',
        expires: 365,
        sameSite: 'None',
        secure: true,
      });
    });

    it('should set EXPLICIT_COOKIE to 2 for requests made outside the UK', () => {
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners(false));

      act(() => {
        result.current.handleCookieBannerRejected();
      });

      expect(cookieSetterSpy).toHaveBeenCalledWith(EXPLICIT_COOKIE, '2', {
        domain: '.bbc.com',
        expires: 365,
        sameSite: 'None',
        secure: true,
      });
    });
  });
});
