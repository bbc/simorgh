/* eslint-disable global-require */
import { renderHook, act } from '@testing-library/react-hooks';
import Cookies from 'js-cookie';

import useConsentBanners from '.';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';
const DEFAULT_PRIVACY_COOKIE = 'july2019';
const DEFAULT_EXPLICIT_COOKIE = '1';
const DEFAULT_POLICY_COOKIE = '111';

const cookieSetterSpy = jest.spyOn(Cookies, 'set');

beforeEach(() => {
  global.document.domain = 'www.bbc.com';
  Cookies.set(PRIVACY_COOKIE, DEFAULT_PRIVACY_COOKIE);
  Cookies.set(EXPLICIT_COOKIE, DEFAULT_EXPLICIT_COOKIE);
  Cookies.set(POLICY_COOKIE, DEFAULT_POLICY_COOKIE);
});

describe('useConsentBanners', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on initial mount', () => {
    it('does not show the privacy banner when PRIVACY_COOKIE is current policy value', () => {
      Cookies.set(PRIVACY_COOKIE, DEFAULT_PRIVACY_COOKIE);
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners());

      expect(result.current.showPrivacyBanner).toBe(false);
    });

    it('does not show the privacy banner when PRIVACY_COOKIE is anythingelse', () => {
      Cookies.set(PRIVACY_COOKIE, 'anythingelse');
      cookieSetterSpy.mockClear();
      const { result } = renderHook(() => useConsentBanners());

      expect(result.current.showPrivacyBanner).toBe(false);
    });

    it('sets PRIVACY_COOKIE and shows the privacy banner when PRIVACY_COOKIE is 0', () => {
      Cookies.set(PRIVACY_COOKIE, '0');
      cookieSetterSpy.mockClear();
      const { result } = renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        DEFAULT_PRIVACY_COOKIE,
        {
          expires: 365,
          domain: '.bbc.com',
        },
      );
      expect(result.current.showPrivacyBanner).toBe(true);
    });

    it('sets PRIVACY_COOKIE and shows the privacy banner when PRIVACY_COOKIE is 1', () => {
      Cookies.set(PRIVACY_COOKIE, '1');
      cookieSetterSpy.mockClear();
      const { result } = renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        DEFAULT_PRIVACY_COOKIE,
        {
          expires: 365,
          domain: '.bbc.com',
        },
      );
      expect(result.current.showPrivacyBanner).toBe(true);
    });

    it('sets PRIVACY_COOKIE and shows privacy banner when cookie is null', () => {
      Cookies.set(PRIVACY_COOKIE, null);
      cookieSetterSpy.mockClear();
      const { result } = renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        DEFAULT_PRIVACY_COOKIE,
        {
          expires: 365,
          domain: '.bbc.com',
        },
      );
      expect(result.current.showPrivacyBanner).toBe(true);
    });

    it('sets PRIVACY_COOKIE without domain restrictions', () => {
      global.document.domain = 'www.bbc.co.uk';
      Cookies.set(PRIVACY_COOKIE, null);
      cookieSetterSpy.mockClear();

      renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        DEFAULT_PRIVACY_COOKIE,
        {
          expires: 365,
          domain: '.bbc.co.uk',
        },
      );
    });

    it('does not show the cookie banner when EXPLICIT_COOKIE is 1 or 2', () => {
      ['1', '2'].forEach(value => {
        Cookies.set(EXPLICIT_COOKIE, value);
        cookieSetterSpy.mockClear();

        const { result } = renderHook(() => useConsentBanners());

        expect(cookieSetterSpy).toHaveBeenCalledTimes(0);
        expect(result.current.showCookieBanner).toBe(false);
      });
    });

    it('shows cookie banner when EXPLICIT_COOKIE is 0 and PRIVACY_COOKIE is set', () => {
      Cookies.set(EXPLICIT_COOKIE, '0');
      Cookies.set(PRIVACY_COOKIE, DEFAULT_PRIVACY_COOKIE);
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledTimes(0);
      expect(result.current.showPrivacyBanner).toBe(false);
      expect(result.current.showCookieBanner).toBe(true);
    });

    it('sets POLICY_COOKIE when it is not set', () => {
      Cookies.remove(POLICY_COOKIE);
      cookieSetterSpy.mockClear();

      renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
        domain: '.bbc.com',
      });
      expect(cookieSetterSpy).toHaveBeenCalledTimes(1);
    });

    it('does not set POLICY_COOKIE when its already set', () => {
      cookieSetterSpy.mockClear();

      renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).not.toHaveBeenCalledWith(
        POLICY_COOKIE,
        expect.anything(),
        expect.anything(),
      );
    });

    it('shows cookie banner when EXPLICIT_COOKIE is 0 and sets POLICY_COOKIE when cookie is null', () => {
      Cookies.set(EXPLICIT_COOKIE, '0');
      Cookies.set(POLICY_COOKIE, null);
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledTimes(1);
      expect(cookieSetterSpy).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
        domain: '.bbc.com',
      });
      expect(result.current.showCookieBanner).toBe(true);
      expect(result.current.showPrivacyBanner).toBe(false);
    });

    it('sets POLICY_COOKIE without domain restrictions', () => {
      global.document.domain = 'www.test.bbc.com';
      Cookies.set(EXPLICIT_COOKIE, '0');
      Cookies.set(POLICY_COOKIE, null);
      cookieSetterSpy.mockClear();

      renderHook(() => useConsentBanners());

      expect(cookieSetterSpy).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
        domain: '.bbc.com',
      });
    });
  });

  describe('privacyOnAllow', () => {
    it('hides privacy banner', () => {
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners());

      act(() => {
        result.current.handlePrivacyBannerAccepted();
      });

      expect(result.current.showPrivacyBanner).toBe(false);
      expect(result.current.showCookieBanner).toBe(true);
      expect(cookieSetterSpy).not.toHaveBeenCalled();
    });
  });

  describe('privacyOnReject', () => {
    it('hides privacy banner', () => {
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners());

      act(() => {
        result.current.handlePrivacyBannerRejected();
      });

      expect(result.current.showPrivacyBanner).toBe(false);
      expect(result.current.showCookieBanner).toBe(true);
      expect(cookieSetterSpy).not.toHaveBeenCalled();
    });
  });

  describe('cookieOnAllow', () => {
    it('hides cookie banner, sets EXPLICIT_COOKIE to 1 and sets POLICY_COOKIE to 111', () => {
      cookieSetterSpy.mockClear();

      const { result } = renderHook(() => useConsentBanners());

      act(() => {
        result.current.handleCookieBannerAccepted();
      });

      expect(result.current.showCookieBanner).toBe(false);
      expect(result.current.showPrivacyBanner).toBe(false);
      expect(Cookies.get(EXPLICIT_COOKIE)).toBe('1');
      expect(Cookies.get(POLICY_COOKIE)).toBe('111');
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost/cookieoven?policy=111',
      );
    });
  });

  describe('cookieOnReject', () => {
    it('hides cookie banner, sets EXPLICIT_COOKIE to 1 and does not set POLICY_COOKIE', () => {
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
    });
  });
});
