/* eslint-disable global-require */
import Cookies from 'js-cookie';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';

const setShowPrivacyBannerMock = jest.fn();
const setShowCookieBannerMock = jest.fn();
const DEFAULT_PRIVACY_COOKIE = 'july2019';
const DEFAULT_EXPLICIT_COOKIE = '1';
const DEFAULT_POLICY_COOKIE = '111';

const cookieSetterSpy = jest.spyOn(Cookies, 'set');

const getConsentBannerUtilities = ({ logger } = {}) => {
  const consentBannerUtilities = require('./index').default;

  return consentBannerUtilities({
    setShowPrivacyBanner: setShowPrivacyBannerMock,
    setShowCookieBanner: setShowCookieBannerMock,
    logger,
  });
};

describe('Consent Banner Utilities', () => {
  afterEach(() => {
    jest.clearAllMocks();
    global.document.domain = 'www.bbc.com';
  });

  describe('runInitial', () => {
    it.only('does not show the privacy banner when PRIVACY_COOKIE is current policy value', () => {
      Cookies.set(PRIVACY_COOKIE, DEFAULT_PRIVACY_COOKIE);
      Cookies.set(EXPLICIT_COOKIE, DEFAULT_EXPLICIT_COOKIE);
      Cookies.set(POLICY_COOKIE, DEFAULT_POLICY_COOKIE);
      cookieSetterSpy.mockClear();
      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(document.cookie).toBe(
        'ckns_privacy=july2019; ckns_explicit=1; ckns_policy=111',
      );
      expect(setShowPrivacyBannerMock).not.toHaveBeenCalled();
    });

    it.only('does not show the privacy banner when PRIVACY_COOKIE is anythingelse', () => {
      Cookies.set(PRIVACY_COOKIE, 'anythingelse');
      Cookies.set(EXPLICIT_COOKIE, DEFAULT_EXPLICIT_COOKIE);
      Cookies.set(POLICY_COOKIE, DEFAULT_POLICY_COOKIE);
      cookieSetterSpy.mockClear();
      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(document.cookie).toBe(
        'ckns_privacy=anythingelse; ckns_explicit=1; ckns_policy=111',
      );
      expect(setShowPrivacyBannerMock).not.toHaveBeenCalled();
    });

    it.only('sets PRIVACY_COOKIE and shows the privacy banner when PRIVACY_COOKIE is 0', () => {
      Cookies.set(PRIVACY_COOKIE, '0');
      Cookies.set(EXPLICIT_COOKIE, DEFAULT_EXPLICIT_COOKIE);
      Cookies.set(POLICY_COOKIE, DEFAULT_POLICY_COOKIE);
      cookieSetterSpy.mockClear();
      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(document.cookie).toBe(
        'ckns_privacy=0; ckns_explicit=1; ckns_policy=111',
      );
      expect(cookieSetterSpy).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        DEFAULT_PRIVACY_COOKIE,
        {
          expires: 365,
          domain: '.bbc.com',
        },
      );
      expect(setShowPrivacyBannerMock).toHaveBeenCalledWith(true);
    });

    it.only('sets PRIVACY_COOKIE and shows the privacy banner when PRIVACY_COOKIE is 1', () => {
      Cookies.set(PRIVACY_COOKIE, '1');
      Cookies.set(EXPLICIT_COOKIE, DEFAULT_EXPLICIT_COOKIE);
      Cookies.set(POLICY_COOKIE, DEFAULT_POLICY_COOKIE);
      cookieSetterSpy.mockClear();
      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(cookieSetterSpy).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        DEFAULT_PRIVACY_COOKIE,
        {
          expires: 365,
          domain: '.bbc.com',
        },
      );
      expect(setShowPrivacyBannerMock).toHaveBeenCalledWith(true);
    });

    it.only('sets PRIVACY_COOKIE and shows privacy banner when cookie is null', () => {
      Cookies.set(PRIVACY_COOKIE, null);
      Cookies.set(EXPLICIT_COOKIE, DEFAULT_EXPLICIT_COOKIE);
      Cookies.set(POLICY_COOKIE, DEFAULT_POLICY_COOKIE);
      cookieSetterSpy.mockClear();
      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(cookieSetterSpy).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        DEFAULT_PRIVACY_COOKIE,
        {
          expires: 365,
          domain: '.bbc.com',
        },
      );
      expect(setShowPrivacyBannerMock).toHaveBeenCalledWith(true);
    });

    it.only('sets PRIVACY_COOKIE without domain restrictions', () => {
      global.document.domain = 'www.bbc.co.uk';
      Cookies.set(PRIVACY_COOKIE, null);
      Cookies.set(EXPLICIT_COOKIE, DEFAULT_EXPLICIT_COOKIE);
      Cookies.set(POLICY_COOKIE, DEFAULT_POLICY_COOKIE);
      cookieSetterSpy.mockClear();

      const { runInitial } = getConsentBannerUtilities();

      runInitial();

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
        const { runInitial } = getConsentBannerUtilities();

        runInitial();

        expect(Cookie.set).toHaveBeenCalledTimes(0);
        expect(setShowCookieBannerMock).not.toHaveBeenCalled();
      });
    });

    it('shows cookie banner when EXPLICIT_COOKIE is 0 and PRIVACY_COOKIE is set', () => {
      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(0);
      expect(setShowCookieBannerMock).toHaveBeenCalledWith(true);
    });

    it('sets POLICY_COOKIE when it is not set', () => {
      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
        domain: '.bbc.com',
      });
    });

    it('does not set POLICY_COOKIE when its already set', () => {
      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).not.toHaveBeenCalledWith(
        POLICY_COOKIE,
        expect.anything(),
        expect.anything(),
      );
    });

    it('shows cookie banner when EXPLICIT_COOKIE is 0 and sets POLICY_COOKIE when cookie is null', () => {
      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
        domain: '.bbc.com',
      });
      expect(setShowCookieBannerMock).toHaveBeenCalledWith(true);
    });

    it('sets POLICY_COOKIE without domain restrictions', () => {
      global.document.domain = 'www.test.bbc.com';

      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
        domain: '.bbc.com',
      });
    });

    it('Passes logger object to setCookieOven when provided', async () => {
      const logger = () => {};
      const { cookieOnAllow } = getConsentBannerUtilities({ logger });

      cookieOnAllow();

      expect(setCookieOvenMock).toHaveBeenCalledWith('111', logger);
    });
  });

  describe('privacyOnAllow', () => {
    it('hides privacy banner', () => {
      const { privacyOnAllow } = getConsentBannerUtilities();

      privacyOnAllow();

      expect(setShowPrivacyBannerMock).toHaveBeenCalledWith(false);
      expect(setShowCookieBannerMock).not.toHaveBeenCalled();
      expect(Cookie.set).not.toHaveBeenCalled();
    });
  });

  describe('privacyOnReject', () => {
    it('hides privacy banner', () => {
      const { privacyOnReject } = getConsentBannerUtilities();

      privacyOnReject();

      expect(setShowPrivacyBannerMock).toHaveBeenCalledWith(false);
      expect(setShowCookieBannerMock).not.toHaveBeenCalled();
      expect(Cookie.set).not.toHaveBeenCalled();
    });
  });

  describe('cookieOnAllow', () => {
    it('hides cookie banner, sets EXPLICIT_COOKIE to 1 and sets POLICY_COOKIE to 111', () => {
      const { cookieOnAllow } = getConsentBannerUtilities();

      cookieOnAllow();

      expect(setShowCookieBannerMock).toHaveBeenCalledWith(false);
      expect(setShowPrivacyBannerMock).not.toHaveBeenCalled();
      expect(setCookieOvenMock).toHaveBeenCalledWith('111', undefined);
    });
  });

  describe('cookieOnReject', () => {
    it('hides cookie banner, sets EXPLICIT_COOKIE to 1 and does not set POLICY_COOKIE', () => {
      const { cookieOnReject } = getConsentBannerUtilities();

      cookieOnReject();

      expect(setShowCookieBannerMock).toHaveBeenCalledWith(false);
      expect(setShowPrivacyBannerMock).not.toHaveBeenCalled();
    });
  });
});
