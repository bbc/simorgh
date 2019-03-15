/* eslint-disable global-require */
const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';

let Cookie;
let getCookieOvenBaseUrl;
const showPrivacyBannerMock = jest.fn();
const showCookieBannerMock = jest.fn();
const cookieOvenUrl = 'https://cookie-oven.api.bbc.com/ckns_policy';

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

const getCanonicalLogic = () => {
  const canonicalLogic = require('./logic').default;
  return canonicalLogic({
    showPrivacyBanner: showPrivacyBannerMock,
    showCookieBanner: showCookieBannerMock,
    cookieOvenUrl,
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

    jest.mock('./cookieOvenBaseUrl', () => jest.fn());
    getCookieOvenBaseUrl = require('./cookieOvenBaseUrl');
    getCookieOvenBaseUrl.mockImplementation(() => 'https://cookieoven.com');
  });

  describe('runInitial', () => {
    it('does not show the privacy banner when PRIVACY_COOKIE is 1', () => {
      setCookieGetMock({ privacy: '1' });

      const { runInitial } = getCanonicalLogic();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(0);
      expect(showPrivacyBannerMock).not.toHaveBeenCalled();
    });

    it('sets PRIVACY_COOKIE and shows privacy banner when cookie is 0', () => {
      setCookieGetMock({ privacy: '0' });

      const { runInitial } = getCanonicalLogic();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(PRIVACY_COOKIE, '1', {
        expires: 365,
      });
      expect(showPrivacyBannerMock).toHaveBeenCalledWith(true);
    });

    it('sets PRIVACY_COOKIE and shows privacy banner when cookie is null', () => {
      setCookieGetMock({ privacy: null });

      const { runInitial } = getCanonicalLogic();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(PRIVACY_COOKIE, '1', {
        expires: 365,
      });
      expect(showPrivacyBannerMock).toHaveBeenCalledWith(true);
    });

    it('does not show the cookie banner when EXPLICIT_COOKIE is 1', () => {
      setCookieGetMock({ explict: '1' });

      const { runInitial } = getCanonicalLogic();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(0);
      expect(showCookieBannerMock).not.toHaveBeenCalled();
    });

    it('shows cookie banner when EXPLICIT_COOKIE is 0 and PRIVACY_COOKIE is set', () => {
      setCookieGetMock({ explict: '0' });

      const { runInitial } = getCanonicalLogic();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(0);
      expect(showCookieBannerMock).toHaveBeenCalledWith(true);
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
      expect(getCookieOvenBaseUrl).toHaveBeenCalledWith(`http://localhost`);
      expect(fetch).toHaveBeenCalledWith(
        `https://cookieoven.com/ckns_policy/000`,
      );
      expect(showCookieBannerMock).toHaveBeenCalledWith(true);
    });
  });

  describe('privacyOnAllow', () => {
    it('hides privacy banner', () => {
      const { privacyOnAllow } = getCanonicalLogic();

      privacyOnAllow();

      expect(showPrivacyBannerMock).toHaveBeenCalledWith(false);
      expect(showCookieBannerMock).not.toHaveBeenCalled();
      expect(Cookie.set).not.toHaveBeenCalled();
    });
  });

  describe('privacyOnReject', () => {
    it('hides privacy banner', () => {
      const { privacyOnReject } = getCanonicalLogic();

      privacyOnReject();

      expect(showPrivacyBannerMock).toHaveBeenCalledWith(false);
      expect(showCookieBannerMock).not.toHaveBeenCalled();
      expect(Cookie.set).not.toHaveBeenCalled();
    });
  });

  describe('cookieOnAllow', () => {
    it('hides cookie banner, sets EXPLICIT_COOKIE to 1 and sets POLICY_COOKIE to 111', () => {
      const { cookieOnAllow } = getCanonicalLogic();

      cookieOnAllow();

      expect(showCookieBannerMock).toHaveBeenCalledWith(false);
      expect(showPrivacyBannerMock).not.toHaveBeenCalled();
      expect(Cookie.set).toHaveBeenCalledTimes(2);
      expect(Cookie.set).toHaveBeenCalledWith(POLICY_COOKIE, '111', {
        expires: 365,
      });
      expect(getCookieOvenBaseUrl).toHaveBeenCalledWith(`http://localhost`);
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

      expect(showCookieBannerMock).toHaveBeenCalledWith(false);
      expect(showPrivacyBannerMock).not.toHaveBeenCalled();
      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(EXPLICIT_COOKIE, '1', {
        expires: 365,
      });
    });
  });
});
