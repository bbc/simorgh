import Cookie from 'js-cookie';
import setCookieOven from './setCookieOven';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';
const COOKIE_EXPIRY = 365;
const COOKIE_BANNER_APPROVED = '1';
const POLICY_APPROVED = '111';
const POLICY_DENIED = '000';
const PRIVACY_COOKIE_CURRENT = 'july2019';
const PRIVACY_COOKIE_PREVIOUS_VALUES = ['0', '1'];

const consentBannerUtilities = ({
  setShowPrivacyBanner,
  setShowCookieBanner,
  logger,
  isUK,
}) => {
  const onClient = typeof window !== 'undefined';

  const domain = isUK ? '.bbc.co.uk' : '.bbc.com';

  const setCookie = (name, value) =>
    Cookie.set(name, value, { expires: COOKIE_EXPIRY, domain });

  const setPolicyCookie = value => {
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
    Cookie.get(EXPLICIT_COOKIE) !== COOKIE_BANNER_APPROVED;
  const policyCookieSet = () => !!Cookie.get(POLICY_COOKIE);

  const setSeenPrivacyBanner = () =>
    setCookie(PRIVACY_COOKIE, PRIVACY_COOKIE_CURRENT);
  const setDefaultPolicy = () => setPolicyCookie(POLICY_DENIED);
  const setApprovedPolicy = () => setPolicyCookie(POLICY_APPROVED);
  const setDismissedCookieBanner = () =>
    setCookie(EXPLICIT_COOKIE, COOKIE_BANNER_APPROVED);

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
        setDefaultPolicy();
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
    setApprovedPolicy();
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
