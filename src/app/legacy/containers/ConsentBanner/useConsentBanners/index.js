import { useReducer, useEffect } from 'react';
import Cookie from 'js-cookie';

import setCookie from '#lib/utilities/setCookie';
import setCookieOven from './setCookieOven';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';
const EXPLICIT_COOKIE_ACCEPTED_VALUES = ['1', '2'];
const POLICY_ACCEPTED = '111';
const POLICY_REJECTED = '000';
const COOKIE_BANNER_EXPLICIT_CHOICE_MADE = '1';
const COOKIE_BANNER_EXPLICIT_CHOICE_MADE_NON_UK = '2';
const PRIVACY_COOKIE_CURRENT_VALUE = 'july2019';
const PRIVACY_COOKIE_LEGACY_VALUES = ['0', '1'];
const SHOW_PRIVACY_BANNER = 'SHOW_PRIVACY_BANNER';
const HIDE_PRIVACY_BANNER = 'HIDE_PRIVACY_BANNER';
const SHOW_COOKIE_BANNER = 'SHOW_COOKIE_BANNER';
const HIDE_COOKIE_BANNER = 'HIDE_COOKIE_BANNER';
const initialState = {
  showPrivacyBanner: false,
  showCookieBanner: false,
};

const bannerReducer = (state, action) => {
  switch (action) {
    case SHOW_PRIVACY_BANNER:
      return {
        showPrivacyBanner: true,
        showCookieBanner: false,
      };
    case SHOW_COOKIE_BANNER:
      return {
        showCookieBanner: true,
        showPrivacyBanner: false,
      };
    case HIDE_PRIVACY_BANNER:
      return {
        ...state,
        showPrivacyBanner: false,
      };
    case HIDE_COOKIE_BANNER:
      return {
        ...state,
        showCookieBanner: false,
      };
    default:
      return state;
  }
};

const isValidCookieValue = value => Boolean(value) && value !== 'null';

const isChromatic = () =>
  process.env.STORYBOOK === 'true' &&
  window.navigator.userAgent.match(/Chromatic/);

// We opted for the sameSite=None attribute below to maintain consistency with Orbit/cross-TLD browsing
// Setting sameSite=None allows the cookie to be accessed and updated on `.co.uk` and `.com`
const SAME_SITE_VALUE = 'None';

const setPolicyCookie = ({ policy, explicit, expires = null }) => {
  if (explicit) {
    // Use cookie oven to set cookie via http so Safari does not delete in 7 days
    setCookieOven(policy);
  } else {
    // Set locally via JS when it's just the default policy as the banner
    // persists anyway so Safari deleting doesn't matter and we can save
    // hitting the oven too hard
    setCookie({
      name: POLICY_COOKIE,
      value: policy,
      sameSite: SAME_SITE_VALUE,
      ...(expires && { expires }),
    });
  }
};

const setUserDidSeePrivacyBanner = (expires = null) => {
  // prevent setting cookies on Chromatic so that snapshots are consistent
  if (!isChromatic()) {
    setCookie({
      name: PRIVACY_COOKIE,
      value: PRIVACY_COOKIE_CURRENT_VALUE,
      sameSite: SAME_SITE_VALUE,
      ...(expires && { expires }),
    });
  }
};

const setDefaultPolicy = () =>
  setPolicyCookie({
    policy: POLICY_REJECTED,
    explicit: false,
  });

const setUserDidAcceptPolicy = () =>
  setPolicyCookie({
    policy: POLICY_ACCEPTED,
    explicit: true,
  });

const setUserDidDismissCookieBanner = (isUK, expires = null) =>
  setCookie({
    name: EXPLICIT_COOKIE,
    value: isUK
      ? COOKIE_BANNER_EXPLICIT_CHOICE_MADE
      : COOKIE_BANNER_EXPLICIT_CHOICE_MADE_NON_UK,
    sameSite: SAME_SITE_VALUE,
    ...(expires && { expires }),
  });

const useConsentBanner = (
  isUK = false,
  showCookieBannerBasedOnCountry = true,
) => {
  const [{ showPrivacyBanner, showCookieBanner }, dispatch] = useReducer(
    bannerReducer,
    initialState,
  );

  useEffect(() => {
    const privacyCookie = Cookie.get(PRIVACY_COOKIE);
    const explicitCookie = Cookie.get(EXPLICIT_COOKIE);
    const policyCookie = Cookie.get(POLICY_COOKIE);

    const userHasPrivacyCookie = isValidCookieValue(privacyCookie);
    const userHasPolicyCookie = isValidCookieValue(policyCookie);
    const userHasLegacyPrivacyCookie =
      PRIVACY_COOKIE_LEGACY_VALUES.includes(privacyCookie);
    const userHasExplicitCookie =
      EXPLICIT_COOKIE_ACCEPTED_VALUES.includes(explicitCookie);
    const shouldShowCookieBanner =
      !userHasExplicitCookie && showCookieBannerBasedOnCountry;
    const shouldShowPrivacyBanner =
      (!userHasPrivacyCookie || userHasLegacyPrivacyCookie) &&
      showCookieBannerBasedOnCountry;

    if (shouldShowPrivacyBanner) {
      dispatch(SHOW_PRIVACY_BANNER);
      setUserDidSeePrivacyBanner();
    } else if (shouldShowCookieBanner) {
      dispatch(SHOW_COOKIE_BANNER);
    } else if (!showCookieBannerBasedOnCountry) {
      setUserDidDismissCookieBanner(isUK, 1);
      if (!userHasPolicyCookie) setUserDidAcceptPolicy();
      setUserDidSeePrivacyBanner(1);
    }

    if (!userHasPolicyCookie) {
      setDefaultPolicy();
    }
  }, [isUK, showCookieBannerBasedOnCountry]);

  const handlePrivacyBannerAccepted = () => {
    dispatch(SHOW_COOKIE_BANNER);
  };

  const handleCookieBannerAccepted = () => {
    dispatch(HIDE_COOKIE_BANNER);
    setUserDidDismissCookieBanner(isUK);
    setUserDidAcceptPolicy();
  };

  const handleCookieBannerRejected = () => {
    dispatch(HIDE_COOKIE_BANNER);
    setUserDidDismissCookieBanner(isUK);
  };

  return {
    showPrivacyBanner,
    showCookieBanner,
    handlePrivacyBannerAccepted,
    handleCookieBannerAccepted,
    handleCookieBannerRejected,
  };
};

export default useConsentBanner;
