import Cookie from 'js-cookie';
import setCookie from '#lib/utilities/setCookie';
import setCookieOven from './setCookieOven';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';
const EXPLICIT_COOKIE_ACCEPTED_VALUES = ['1', '2'];
const POLICY_APPROVED = '111';
const POLICY_DENIED = '000';
const PRIVACY_COOKIE_CURRENT = 'july2019';
const PRIVACY_COOKIE_PREVIOUS_VALUES = ['0', '1'];

const onClient = typeof window !== 'undefined';
const isChromatic = () =>
  process.env.STORYBOOK === 'true' &&
  window.navigator.userAgent.match(/Chromatic/);

// We opted for the sameSite=None attribute below to maintain consistency with Orbit/cross-TLD browsing
// Setting sameSite=None allows the cookie to be accessed and updated on `.co.uk` and `.com`
const SAME_SITE_VALUE = 'None';

const setPolicyCookie = (policy, logger, explicit) => {
  if (explicit) {
    // Use cookie oven to set cookie via http so Safari does not delete in 7 days
    setCookieOven(policy, logger);
  } else {
    // Set locally via JS when it's just the default policy as the banner
    // persists anyway so Safari deleting doesn't matter and we can save
    // hitting the oven too hard
    setCookie({
      name: POLICY_COOKIE,
      value: policy,
      sameSite: SAME_SITE_VALUE,
    });
  }
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
  setCookie({
    name: PRIVACY_COOKIE,
    value: PRIVACY_COOKIE_CURRENT,
    sameSite: SAME_SITE_VALUE,
  });
const setDefaultPolicy = logger =>
  setPolicyCookie(POLICY_DENIED, logger, false);
const setApprovedPolicy = logger =>
  setPolicyCookie(POLICY_APPROVED, logger, true);
const setDismissedCookieBanner = logger =>
  setPolicyCookie(POLICY_DENIED, logger, true);

const consentBannerUtilities = ({
  setShowPrivacyBanner,
  setShowCookieBanner,
  logger,
}) => {
  const runInitial = () => {
    if (onClient) {
      if (isChromatic()) {
        // prevent setting cookies so chromatic snapshots are consistent
        setShowPrivacyBanner(true);
        return;
      }

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
