import 'isomorphic-fetch';
import Cookie from 'js-cookie';
import getCookieOvenBaseUrl from './cookieOvenBaseUrl';

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

const setCookieOven = value => {
  if (window.location && window.location.origin) {
    try {
      fetch(
        `${getCookieOvenBaseUrl(
          window.location.origin,
        )}/${POLICY_COOKIE}/${value}`,
      );
    } catch (e) {} // eslint-disable-line no-empty
  }
};

const setPolicyCookie = value => {
  setCookie(POLICY_COOKIE, value);
  setCookieOven(value);
};

const seenPrivacyBanner = () => Cookie.get(PRIVACY_COOKIE) === BANNER_APPROVED;
const seenCookieBanner = () => Cookie.get(EXPLICIT_COOKIE) === BANNER_APPROVED;
const policyCookieSet = () => !!Cookie.get(POLICY_COOKIE);

const setSeenPrivacyBanner = () => setCookie(PRIVACY_COOKIE, BANNER_APPROVED);
const setDefaultPolicy = () => setPolicyCookie(POLICY_DENIED);
const setAppovedPolicy = () => setPolicyCookie(POLICY_APPROVED);
const setDismissedCookieBanner = () =>
  setCookie(EXPLICIT_COOKIE, BANNER_APPROVED);

const canonicalBannerLogic = ({ showPrivacyBanner, showCookieBanner }) => {
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
        setDefaultPolicy();
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
    setAppovedPolicy();
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
