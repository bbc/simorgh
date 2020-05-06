/* eslint-disable global-require */
const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';

let Cookie;
let setCookieOvenMock;
const setShowPrivacyBannerMock = jest.fn();
const setShowCookieBannerMock = jest.fn();
const PRIVACY_COOKIE_CURRENT = 'july2019';
const setCookieGetMock = ({
  privacy = PRIVACY_COOKIE_CURRENT,
  explicit = '1',
  policy = '111',
}) => {
  Cookie.get.mockImplementation(cookie => {
    if (cookie === PRIVACY_COOKIE) {
      return privacy;
    }

    if (cookie === EXPLICIT_COOKIE) {
      return explicit;
    }

    return policy;
  });
};

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

  beforeEach(() => {
    jest.mock('js-cookie', () => jest.fn());
    Cookie = require('js-cookie');
    Cookie.get = jest.fn();
    Cookie.set = jest.fn();

    jest.mock('./setCookieOven', () => jest.fn());
    setCookieOvenMock = require('./setCookieOven');
  });

  describe('runInitial', () => {
    it('does not show the privacy banner when PRIVACY_COOKIE is current policy value', () => {
      setCookieGetMock({ privacy: PRIVACY_COOKIE_CURRENT });

      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(0);
      expect(setShowPrivacyBannerMock).not.toHaveBeenCalled();
    });

    it('does not show the privacy banner when PRIVACY_COOKIE is anythingelse', () => {
      setCookieGetMock({ privacy: 'anythingelse' });

      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(0);
      expect(setShowPrivacyBannerMock).not.toHaveBeenCalled();
    });

    it('sets PRIVACY_COOKIE and shows the privacy banner when PRIVACY_COOKIE is 0', () => {
      setCookieGetMock({ privacy: '0' });

      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        PRIVACY_COOKIE_CURRENT,
        {
          expires: 365,
          domain: `.bbc.com`,
          sameSite: 'None',
          secure: false,
        },
      );
      expect(setShowPrivacyBannerMock).toHaveBeenCalledWith(true);
    });

    it('sets PRIVACY_COOKIE and shows the privacy banner when PRIVACY_COOKIE is 1', () => {
      setCookieGetMock({ privacy: '1' });

      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        PRIVACY_COOKIE_CURRENT,
        {
          expires: 365,
          domain: '.bbc.com',
          sameSite: 'None',
          secure: false,
        },
      );
      expect(setShowPrivacyBannerMock).toHaveBeenCalledWith(true);
    });

    it('sets PRIVACY_COOKIE and shows privacy banner when cookie is null', () => {
      setCookieGetMock({ privacy: null });

      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        PRIVACY_COOKIE_CURRENT,
        {
          expires: 365,
          domain: '.bbc.com',
          sameSite: 'None',
          secure: false,
        },
      );
      expect(setShowPrivacyBannerMock).toHaveBeenCalledWith(true);
    });

    it('sets PRIVACY_COOKIE without domain restrictions', () => {
      global.document.domain = 'www.bbc.co.uk';

      setCookieGetMock({ privacy: null });

      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledWith(
        PRIVACY_COOKIE,
        PRIVACY_COOKIE_CURRENT,
        {
          expires: 365,
          domain: '.bbc.co.uk',
          sameSite: 'None',
          secure: false,
        },
      );
    });

    it('does not show the cookie banner when EXPLICIT_COOKIE is 1 or 2', () => {
      ['1', '2'].forEach(value => {
        setCookieGetMock({ explicit: value });

        const { runInitial } = getConsentBannerUtilities();

        runInitial();

        expect(Cookie.set).toHaveBeenCalledTimes(0);
        expect(setShowCookieBannerMock).not.toHaveBeenCalled();
      });
    });

    it('shows cookie banner when EXPLICIT_COOKIE is 0 and PRIVACY_COOKIE is set', () => {
      setCookieGetMock({ explicit: '0' });

      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(0);
      expect(setShowCookieBannerMock).toHaveBeenCalledWith(true);
    });

    it('sets POLICY_COOKIE when it is not set', () => {
      setCookieGetMock({ policy: null });

      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
        domain: '.bbc.com',
        sameSite: 'None',
        secure: false,
      });
      expect(setCookieOvenMock).toHaveBeenCalledWith(
        POLICY_COOKIE,
        '000',
        undefined,
      );
    });

    it('does not set POLICY_COOKIE when its already set', () => {
      setCookieGetMock({ policy: '010' });

      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).not.toHaveBeenCalledWith(
        POLICY_COOKIE,
        expect.anything(),
        expect.anything(),
      );
    });

    it('shows cookie banner when EXPLICIT_COOKIE is 0 and sets POLICY_COOKIE when cookie is null', () => {
      setCookieGetMock({ explicit: '0', policy: null });

      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
        domain: '.bbc.com',
        sameSite: 'None',
        secure: false,
      });
      expect(setCookieOvenMock).toHaveBeenCalledWith(
        POLICY_COOKIE,
        '000',
        undefined,
      );
      expect(setShowCookieBannerMock).toHaveBeenCalledWith(true);
    });

    it('sets POLICY_COOKIE without domain restrictions', () => {
      setCookieGetMock({ explicit: '0', policy: null });
      global.document.domain = 'www.test.bbc.com';

      const { runInitial } = getConsentBannerUtilities();

      runInitial();

      expect(Cookie.set).toHaveBeenCalledWith(POLICY_COOKIE, '000', {
        expires: 365,
        domain: '.bbc.com',
        sameSite: 'None',
        secure: false,
      });
    });

    it('Passes logger object to setCookieOven when provided', async () => {
      const logger = () => {};
      const { cookieOnAllow } = getConsentBannerUtilities({ logger });

      cookieOnAllow();

      expect(setCookieOvenMock).toHaveBeenCalledWith(
        POLICY_COOKIE,
        '111',
        logger,
      );
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
      expect(Cookie.set).toHaveBeenCalledTimes(2);
      expect(Cookie.set).toHaveBeenCalledWith(POLICY_COOKIE, '111', {
        expires: 365,
        domain: '.bbc.com',
        sameSite: 'None',
        secure: false,
      });
      expect(setCookieOvenMock).toHaveBeenCalledWith(
        POLICY_COOKIE,
        '111',
        undefined,
      );
      expect(Cookie.set).toHaveBeenCalledWith(EXPLICIT_COOKIE, '1', {
        expires: 365,
        domain: '.bbc.com',
        sameSite: 'None',
        secure: false,
      });
    });
  });

  describe('cookieOnReject', () => {
    it('hides cookie banner, sets EXPLICIT_COOKIE to 1 and does not set POLICY_COOKIE', () => {
      const { cookieOnReject } = getConsentBannerUtilities();

      cookieOnReject();

      expect(setShowCookieBannerMock).toHaveBeenCalledWith(false);
      expect(setShowPrivacyBannerMock).not.toHaveBeenCalled();
      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(EXPLICIT_COOKIE, '1', {
        expires: 365,
        domain: '.bbc.com',
        sameSite: 'None',
        secure: false,
      });
    });
  });
});
