import 'isomorphic-fetch';
import Cookie from 'js-cookie';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';
const COOKIE_EXPIRY = 365;
const BANNER_APPROVED = '1';
const POLICY_APPROVED = '111';
const POLICY_DENIED = '000';

const onClient = typeof document !== 'undefined';

const setCookie = (name, value) =>
  Cookie.set(name, value, { expires: COOKIE_EXPIRY });

const cookieOven = (cookieOvenUrl, value) => {
  try {
    fetch(`${cookieOvenUrl}/${value}`);
  } catch (e) {} // eslint-disable-line no-empty
};

const setPolicyCookie = (cookieOvenUrl, value) => {
  setCookie(POLICY_COOKIE, value);
  cookieOven(cookieOvenUrl, value);
};

const setPolicyCookieIfUnset = (cookieOvenUrl, value) => {
  if (!Cookie.get(POLICY_COOKIE)) {
    setPolicyCookie(cookieOvenUrl, value);
  }
};

const canonicalBannerLogic = ({
  setShowPrivacy,
  setShowCookie,
  cookieOvenUrl,
}) => {
  const runInitial = () => {
    if (onClient) {
      if (Cookie.get(PRIVACY_COOKIE) !== BANNER_APPROVED) {
        setShowPrivacy(true);
        setCookie(PRIVACY_COOKIE, BANNER_APPROVED);
      }

      if (Cookie.get(EXPLICIT_COOKIE) !== BANNER_APPROVED) {
        setShowCookie(true);
        setPolicyCookieIfUnset(cookieOvenUrl, POLICY_DENIED);
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
    setPolicyCookie(cookieOvenUrl, POLICY_APPROVED);
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
