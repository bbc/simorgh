import 'isomorphic-fetch';
import Cookie from 'js-cookie';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';
const COOKIE_OVEN_URL = `https://cookie-oven.api.bbc.com/ckns_policy/`;
const COOKIE_EXPIRY = 365;
const BANNER_APPROVED = '1';
const POLICY_APPROVED = '111';
const POLICY_DENIED = '000';

const onClient = typeof document !== 'undefined';

const setCookie = (name, value) =>
  Cookie.set(name, value, { expires: COOKIE_EXPIRY });

const cookieOven = value => {
  fetch(COOKIE_OVEN_URL + value);
};

const setPolicyCookie = value => {
  setCookie(POLICY_COOKIE, value);
  cookieOven(value);
};

const setPolicyCookieIfUnset = value => {
  if (!Cookie.get(POLICY_COOKIE)) {
    setPolicyCookie(value);
  }
};

const canonicalBannerLogic = ({ setShowPrivacy, setShowCookie }) => {
  const runInitial = () => {
    if (onClient) {
      if (Cookie.get(PRIVACY_COOKIE) !== BANNER_APPROVED) {
        setShowPrivacy(true);
        setCookie(PRIVACY_COOKIE, BANNER_APPROVED);
      }

      if (Cookie.get(EXPLICIT_COOKIE) !== BANNER_APPROVED) {
        setShowCookie(true);
        setPolicyCookieIfUnset(POLICY_DENIED);
      }
    }
  };

  const privacyOnAllow = () => {
    setShowPrivacy(false);
  };

  const privacyOnReject = () => {
    setShowPrivacy(false);
  };

  const cookieOnAllow = () => {
    setShowCookie(false);
    setCookie(EXPLICIT_COOKIE, BANNER_APPROVED);
    setPolicyCookie(POLICY_APPROVED);
  };

  const cookieOnReject = () => {
    setShowCookie(false);
    setCookie(EXPLICIT_COOKIE, BANNER_APPROVED);
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
