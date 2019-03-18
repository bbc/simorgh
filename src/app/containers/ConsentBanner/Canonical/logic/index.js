import Cookie from 'js-cookie';
import setCookieOven from './setCookieOven';

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

const setPolicyCookie = (value, logger) => {
  setCookie(POLICY_COOKIE, value);
  setCookieOven(POLICY_COOKIE, value, logger);
};

const seenPrivacyBanner = () => Cookie.get(PRIVACY_COOKIE) === BANNER_APPROVED;
const seenCookieBanner = () => Cookie.get(EXPLICIT_COOKIE) === BANNER_APPROVED;
const policyCookieSet = () => !!Cookie.get(POLICY_COOKIE);

const setSeenPrivacyBanner = () => setCookie(PRIVACY_COOKIE, BANNER_APPROVED);
const setDefaultPolicy = logger => setPolicyCookie(POLICY_DENIED, logger);
const setAppovedPolicy = logger => setPolicyCookie(POLICY_APPROVED, logger);
const setDismissedCookieBanner = () =>
  setCookie(EXPLICIT_COOKIE, BANNER_APPROVED);

const canonicalBannerLogic = ({
  setShowPrivacyBanner,
  setShowCookieBanner,
  logger,
}) => {
  const runInitial = () => {
    if (onClient) {
      if (!seenPrivacyBanner()) {
        setShowPrivacyBanner(true);
        setSeenPrivacyBanner();
      }

      if (!seenCookieBanner()) {
        setShowCookieBanner(true);
      }

      if (!policyCookieSet()) {
        setDefaultPolicy(logger);
      }
    }
  };

  const privacyOnAllow = () => {
    setShowPrivacyBanner(false);
  };

  const privacyOnReject = () => {
    setShowPrivacyBanner(false);
  };

  const cookieOnAllow = () => {
    setShowCookieBanner(false);
    setDismissedCookieBanner();
    setAppovedPolicy(logger);
  };

  const cookieOnReject = () => {
    setShowCookieBanner(false);
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
