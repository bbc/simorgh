import Cookie from 'js-cookie';
import setCookie from '#lib/utilities/setCookie';
import setCookieOven from './setCookieOven';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';
const COOKIE_BANNER_APPROVED = '1';
const EXPLICIT_COOKIE_ACCEPTED_VALUES = ['1', '2'];
const POLICY_APPROVED = '111';
const POLICY_DENIED = '000';
const PRIVACY_COOKIE_CURRENT = 'july2019';
const PRIVACY_COOKIE_PREVIOUS_VALUES = ['0', '1'];

const onClient = typeof window !== 'undefined';

const setPolicyCookie = (value, logger) => {
  setCookie(POLICY_COOKIE, value);
  setCookieOven(POLICY_COOKIE, value, logger);
};

const showPrivacyBanner = () => {
  const privacyCookie = Cookie.get(PRIVACY_COOKIE);
  return (
    !privacyCookie || PRIVACY_COOKIE_PREVIOUS_VALUES.includes(privacyCookie)
  );
};
const showCookieBanner = () =>
  !EXPLICIT_COOKIE_ACCEPTED_VALUES.includes(Cookie.get(EXPLICIT_COOKIE));
const policyCookieSet = () => !!Cookie.get(POLICY_COOKIE);

const setSeenPrivacyBanner = () =>
  setCookie(PRIVACY_COOKIE, PRIVACY_COOKIE_CURRENT);
const setDefaultPolicy = logger => setPolicyCookie(POLICY_DENIED, logger);
const setApprovedPolicy = logger => setPolicyCookie(POLICY_APPROVED, logger);
const setDismissedCookieBanner = () =>
  setCookie(EXPLICIT_COOKIE, COOKIE_BANNER_APPROVED);

const consentBannerUtilities = ({
  setShowPrivacyBanner,
  setShowCookieBanner,
  logger,
}) => {
  const runInitial = () => {
    if (onClient) {
      if (showPrivacyBanner()) {
        setShowPrivacyBanner(true);
        setSeenPrivacyBanner();
      }

      if (showCookieBanner()) {
        // Up to the application renderer to show the privacy
        // banner and cookie banner in the correct order
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
    setApprovedPolicy(logger);
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

export default consentBannerUtilities;
