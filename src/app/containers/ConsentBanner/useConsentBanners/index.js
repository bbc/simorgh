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
const PRIVACY_COOKIE_CURRENT_VALUE = 'july2019';
const PRIVACY_COOKIE_LEGACY_VALUES = ['0', '1'];
const SHOW_PRIVACY_BANNER = 'SHOW_PRIVACY_BANNER';
const SHOW_COOKIE_BANNER = 'SHOW_COOKIE_BANNER';
const initialState = {
  showPrivacyBanner: false,
  showCookieBanner: false,
};

const bannerReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_PRIVACY_BANNER: {
      const showPrivacyBanner = payload;
      const { showCookieBanner } = state;

      return {
        showPrivacyBanner,
        showCookieBanner: showPrivacyBanner ? false : showCookieBanner,
      };
    }
    case SHOW_COOKIE_BANNER: {
      const showCookieBanner = payload;
      const { showPrivacyBanner } = state;

      return {
        showCookieBanner,
        showPrivacyBanner: showCookieBanner ? false : showPrivacyBanner,
      };
    }
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

const setPolicyCookie = ({ policy, explicit }) => {
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
    });
  }
};

const setUserDidSeePrivacyBanner = () => {
  // prevent setting cookies on Chromatic so that snapshots are consistent
  if (!isChromatic()) {
    setCookie({
      name: PRIVACY_COOKIE,
      value: PRIVACY_COOKIE_CURRENT_VALUE,
      sameSite: SAME_SITE_VALUE,
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

const setUserDidDismissCookieBanner = () =>
  setCookie({
    name: EXPLICIT_COOKIE,
    value: COOKIE_BANNER_EXPLICIT_CHOICE_MADE,
    sameSite: SAME_SITE_VALUE,
  });

const useConsentBanner = () => {
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
    const userHasLegacyPrivacyCookie = PRIVACY_COOKIE_LEGACY_VALUES.includes(
      privacyCookie,
    );
    const userHasExplicitCookie = EXPLICIT_COOKIE_ACCEPTED_VALUES.includes(
      explicitCookie,
    );
    const shouldShowCookieBanner = !userHasExplicitCookie;
    const shouldShowPrivacyBanner =
      !userHasPrivacyCookie || userHasLegacyPrivacyCookie;

    if (shouldShowPrivacyBanner) {
      dispatch({
        type: SHOW_PRIVACY_BANNER,
        payload: true,
      });
      setUserDidSeePrivacyBanner();
    } else if (shouldShowCookieBanner) {
      dispatch({
        type: SHOW_COOKIE_BANNER,
        payload: true,
      });
    }

    if (!userHasPolicyCookie) {
      setDefaultPolicy();
    }
  }, []);

  const handlePrivacyBannerAccepted = () => {
    dispatch({
      type: SHOW_COOKIE_BANNER,
      payload: true,
    });
  };

  const handleCookieBannerAccepted = () => {
    dispatch({
      type: SHOW_COOKIE_BANNER,
      payload: false,
    });
    setUserDidDismissCookieBanner();
    setUserDidAcceptPolicy();
  };

  const handleCookieBannerRejected = () => {
    dispatch({
      type: SHOW_COOKIE_BANNER,
      payload: false,
    });
    setUserDidDismissCookieBanner();
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
