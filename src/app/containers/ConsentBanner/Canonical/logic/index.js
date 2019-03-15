import 'isomorphic-fetch';
import Cookie from 'js-cookie';
import cookieOvenUrl from './cookieOvenUrl';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';
const COOKIE_EXPIRY = 365;
const BANNER_APPROVED = '1';
const POLICY_APPROVED = '111';
const POLICY_DENIED = '000';

const onClient = typeof window !== 'undefined';

const setCookie = (name, value) =>
  Cookie.set(name, value, { expires: COOKIE_EXPIRY });

const setCookieOven = (value, logger) => {
  if (window.location && window.location.origin) {
    try {
      fetch(
        `${cookieOvenUrl(window.location.origin)}/${POLICY_COOKIE}/${value}`,
      );
    } catch (e) {
      const log = logger || console;
      log.error(e);
    }
  }
};

const setPolicyCookie = (value, logger) => {
  setCookie(POLICY_COOKIE, value);
  setCookieOven(value, logger);
};

const seenPrivacyBanner = () => Cookie.get(PRIVACY_COOKIE) === BANNER_APPROVED;
const seenCookieBanner = () => Cookie.get(EXPLICIT_COOKIE) === BANNER_APPROVED;
const policyCookieSet = () => !!Cookie.get(POLICY_COOKIE);

const setSeenPrivacyBanner = () => setCookie(PRIVACY_COOKIE, BANNER_APPROVED);
const setDefaultPolicy = logger => setPolicyCookie(POLICY_DENIED, logger);
const setAppovedPolicy = logger => setPolicyCookie(POLICY_APPROVED, logger);
const setDismissedCookieBanner = () =>
  setCookie(EXPLICIT_COOKIE, BANNER_APPROVED);

const canonicalBannerLogic = ({ showPrivacyBanner, showCookieBanner, logger }) => {
  const runInitial = () => {
    if (onClient) {
      if (!seenPrivacyBanner()) {
        showPrivacyBanner(true);
        setSeenPrivacyBanner();
      }

      if (!seenCookieBanner()) {
        showCookieBanner(true);
      }

      if (!policyCookieSet()) {
        setDefaultPolicy(logger);
      }
    }
  };

  const privacyOnAllow = () => {
    showPrivacyBanner(false);
  };

  const privacyOnReject = () => {
    showPrivacyBanner(false);
  };

  const cookieOnAllow = () => {
    showCookieBanner(false);
    setDismissedCookieBanner();
    setAppovedPolicy(logger);
  };

  const cookieOnReject = () => {
    showCookieBanner(false);
    setDismissedCookieBanner();
  };

  return {
    runInitial,
    privacyOnAllow,
    privacyOnReject,
    cookieOnAllow,
    cookieOnReject,
  };
};

export default canonicalBannerLogic;
