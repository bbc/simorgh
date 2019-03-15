/* eslint-disable global-require */
const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';

let Cookie;
let cookieOvenUrlMock;
const setShowPrivacyBannerMock = jest.fn();
const setShowCookieBannerMock = jest.fn();

const setCookieGetMock = ({ privacy = '1', explict = '1', policy = '111' }) => {
  Cookie.get.mockImplementation(cookie => {
    if (cookie === PRIVACY_COOKIE) {
      return privacy;
    }

    if (cookie === EXPLICIT_COOKIE) {
      return explict;
    }

    return policy;
  });
};

const getCanonicalLogic = ({ logger } = {}) => {
  const canonicalLogic = require('./index').default;
  return canonicalLogic({
    setShowPrivacyBanner: setShowPrivacyBannerMock,
    setShowCookieBanner: setShowCookieBannerMock,
    logger,
  });
};

describe('Consent Banner Canonical Logic', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.mock('js-cookie', () => jest.fn());
    Cookie = require('js-cookie');
    Cookie.get = jest.fn();
    Cookie.set = jest.fn();

    jest.mock('./cookieOvenUrl', () => jest.fn());
    cookieOvenUrlMock = require('./cookieOvenUrl');
    cookieOvenUrlMock.mockImplementation(() => 'https://cookieoven.com');
  });

  describe('runInitial', () => {
    it('does not show the privacy banner when PRIVACY_COOKIE is 1', () => {
      setCookieGetMock({ privacy: '1' });

      const { runInitial } = getCanonicalLogic();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(0);
      expect(setShowPrivacyBannerMock).not.toHaveBeenCalled();
    });

    it('sets PRIVACY_COOKIE and shows privacy banner when cookie is 0', () => {
      setCookieGetMock({ privacy: '0' });

      const { runInitial } = getCanonicalLogic();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(PRIVACY_COOKIE, '1', {
        expires: 365,
      });
      expect(setShowPrivacyBannerMock).toHaveBeenCalledWith(true);
    });

    it('sets PRIVACY_COOKIE and shows privacy banner when cookie is null', () => {
      setCookieGetMock({ privacy: null });

      const { runInitial } = getCanonicalLogic();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(PRIVACY_COOKIE, '1', {
        expires: 365,
      });
      expect(setShowPrivacyBannerMock).toHaveBeenCalledWith(true);
    });

    it('does not show the cookie banner when EXPLICIT_COOKIE is 1', () => {
      setCookieGetMock({ explict: '1' });

      const { runInitial } = getCanonicalLogic();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(0);
      expect(setShowCookieBannerMock).not.toHaveBeenCalled();
    });

    it('shows cookie banner when EXPLICIT_COOKIE is 0 and PRIVACY_COOKIE is set', () => {
      setCookieGetMock({ explict: '0' });

      const { runInitial } = getCanonicalLogic();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(0);
      expect(setShowCookieBannerMock).toHaveBeenCalledWith(true);
    });

    it('sets POLICY_COOKIE when it is not set', () => {
      setCookieGetMock({ policy: null });

      const { runInitial } = getCanonicalLogic();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
      });
      expect(fetch).toHaveBeenCalledWith(
        `https://cookieoven.com/ckns_policy/000`,
      );
    });

    it('does not set POLICY_COOKIE when its already set', () => {
      setCookieGetMock({ policy: '010' });

      const { runInitial } = getCanonicalLogic();

      runInitial();

      expect(Cookie.set).not.toHaveBeenCalledWith(
        POLICY_COOKIE,
        expect.anything(),
        expect.anything(),
      );
    });

    it('shows cookie banner when EXPLICIT_COOKIE is 0 and sets POLICY_COOKIE when cookie is null', () => {
      setCookieGetMock({ explict: '0', policy: null });

      const { runInitial } = getCanonicalLogic();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
      });
      expect(cookieOvenUrlMock).toHaveBeenCalledWith(`http://localhost`);
      expect(fetch).toHaveBeenCalledWith(
        `https://cookieoven.com/ckns_policy/000`,
      );
      expect(setShowCookieBannerMock).toHaveBeenCalledWith(true);
    });
  });

  describe('privacyOnAllow', () => {
    it('hides privacy banner', () => {
      const { privacyOnAllow } = getCanonicalLogic();

      privacyOnAllow();

      expect(setShowPrivacyBannerMock).toHaveBeenCalledWith(false);
      expect(setShowCookieBannerMock).not.toHaveBeenCalled();
      expect(Cookie.set).not.toHaveBeenCalled();
    });
  });

  describe('privacyOnReject', () => {
    it('hides privacy banner', () => {
      const { privacyOnReject } = getCanonicalLogic();

      privacyOnReject();

      expect(setShowPrivacyBannerMock).toHaveBeenCalledWith(false);
      expect(setShowCookieBannerMock).not.toHaveBeenCalled();
      expect(Cookie.set).not.toHaveBeenCalled();
    });
  });

  describe('cookieOnAllow', () => {
    it('hides cookie banner, sets EXPLICIT_COOKIE to 1 and sets POLICY_COOKIE to 111', () => {
      const { cookieOnAllow } = getCanonicalLogic();

      cookieOnAllow();

      expect(setShowCookieBannerMock).toHaveBeenCalledWith(false);
      expect(setShowPrivacyBannerMock).not.toHaveBeenCalled();
      expect(Cookie.set).toHaveBeenCalledTimes(2);
      expect(Cookie.set).toHaveBeenCalledWith(POLICY_COOKIE, '111', {
        expires: 365,
      });
      expect(cookieOvenUrlMock).toHaveBeenCalledWith(`http://localhost`);
      expect(fetch).toHaveBeenCalledWith(
        `https://cookieoven.com/ckns_policy/111`,
      );
      expect(Cookie.set).toHaveBeenCalledWith(EXPLICIT_COOKIE, '1', {
        expires: 365,
      });
    });
  });

  describe('cookieOnReject', () => {
    it('hides cookie banner, sets EXPLICIT_COOKIE to 1 and does not set POLICY_COOKIE', () => {
      const { cookieOnReject } = getCanonicalLogic();

      cookieOnReject();

      expect(setShowCookieBannerMock).toHaveBeenCalledWith(false);
      expect(setShowPrivacyBannerMock).not.toHaveBeenCalled();
      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(EXPLICIT_COOKIE, '1', {
        expires: 365,
      });
    });
  });

  // describe('Logging Cookie Oven', () => {
  //   beforeEach(() => {
  //     fetch.mockReject(() => Promise.reject(new Error("something bad happened")));
  //   });

  //   afterEach(() => {
  //     fetch.resetMocks();
  //   });

  //   it('Uses logger object to log error when provided', () => {
  //     const logger = { error: jest.fn() };
  //     global.console = { error: jest.fn() };

  //     const { cookieOnAllow } = getCanonicalLogic({ logger });

  //     cookieOnAllow();

  //     expect(fetch).toHaveBeenCalled();
  //     expect(logger.error).toHaveBeenCalledWith('hehe');
  //     expect(global.console.error).no.toHaveBeenCalled();
  //   });

  //   it('Uses console.error to log error when logger object isnt provided', () => {
  //     global.console = { error: jest.fn() };

  //     const { cookieOnAllow } = getCanonicalLogic();

  //     cookieOnAllow();

  //     expect(fetch).toHaveBeenCalled();
  //     expect(global.console.error).toHaveBeenCalledWith();
  //   });
  // });
});
