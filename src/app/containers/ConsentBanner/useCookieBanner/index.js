import { useReducer, useEffect } from 'react';
import Cookie from 'js-cookie';

import setCookie from '#lib/utilities/setCookie';
import setCookieOven from './setCookieOven';

const PRIVACY_COOKIE_NAME = 'ckns_privacy';
const EXPLICIT_COOKIE_NAME = 'ckns_explicit';
const POLICY_COOKIE_NAME = 'ckns_policy';
const EXPLICIT_COOKIE_ACCEPTED_VALUES = ['1', '2'];
const POLICY_ACCEPTED = '111';
const POLICY_REJECTED = '000';
const COOKIE_BANNER_ACCEPTED = '1';
const PRIVACY_COOKIE_CURRENT_VALUE = 'july2019';
const PRIVACY_COOKIE_LEGACY_VALUES = ['0', '1'];
const ACTIONS = {
  SHOW_PRIVACY_BANNER: 'SHOW_PRIVACY_BANNER',
  SHOW_COOKIE_BANNER: 'SHOW_COOKIE_BANNER',
};
const initialBannerState = {
  showPrivacyBanner: false,
  showCookieBanner: false,
};

const bannerReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SHOW_PRIVACY_BANNER: {
      const showPrivacyBanner = payload;
      const { showCookieBanner } = state;

      return {
        showPrivacyBanner,
        showCookieBanner: showPrivacyBanner ? false : showCookieBanner,
      };
    }
    case ACTIONS.SHOW_COOKIE_BANNER: {
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
      name: POLICY_COOKIE_NAME,
      value: policy,
      sameSite: SAME_SITE_VALUE,
    });
  }
};

const setUserDidSeePrivacyBanner = () =>
  setCookie({
    name: PRIVACY_COOKIE_NAME,
    value: PRIVACY_COOKIE_CURRENT_VALUE,
    sameSite: SAME_SITE_VALUE,
  });

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
    name: EXPLICIT_COOKIE_NAME,
    value: COOKIE_BANNER_ACCEPTED,
    sameSite: SAME_SITE_VALUE,
  });

const useConsentBanner = () => {
  const [{ showPrivacyBanner, showCookieBanner }, dispatch] = useReducer(
    bannerReducer,
    initialBannerState,
  );

  useEffect(() => {
    const privacyCookieValue = Cookie.get(PRIVACY_COOKIE_NAME);
    const explicitCookieValue = Cookie.get(EXPLICIT_COOKIE_NAME);
    const policyCookieValue = Cookie.get(POLICY_COOKIE_NAME);

    const userHasPrivacyCookie = Boolean(privacyCookieValue);
    const userHasPolicyCookie = Boolean(policyCookieValue);
    const userHasLegacyPrivacyCookie = PRIVACY_COOKIE_LEGACY_VALUES.includes(
      privacyCookieValue,
    );
    const userHasExplicitCookie = EXPLICIT_COOKIE_ACCEPTED_VALUES.includes(
      explicitCookieValue,
    );
    const shouldShowCookieBanner = !userHasExplicitCookie;
    const shouldShowPrivacyBanner =
      !userHasPrivacyCookie || userHasLegacyPrivacyCookie;

    if (isChromatic()) {
      // prevent setting cookies so chromatic snapshots are consistent
      dispatch({
        type: ACTIONS.SHOW_PRIVACY_BANNER,
        payload: true,
      });
    } else {
      if (shouldShowPrivacyBanner) {
        dispatch({
          type: ACTIONS.SHOW_PRIVACY_BANNER,
          payload: true,
        });
        setUserDidSeePrivacyBanner();
      } else if (shouldShowCookieBanner) {
        dispatch({
          type: ACTIONS.SHOW_COOKIE_BANNER,
          payload: true,
        });
      }

      if (!userHasPolicyCookie) {
        setDefaultPolicy();
      }
    }
  }, []);

  const handlePrivacyBannerAccepted = () => {
    dispatch({
      type: ACTIONS.SHOW_COOKIE_BANNER,
      payload: true,
    });
  };

  const handlePrivacyBannerRejected = () => {
    dispatch({
      type: ACTIONS.SHOW_COOKIE_BANNER,
      payload: true,
    });
  };

  const handleCookieBannerAccepted = () => {
    dispatch({
      type: ACTIONS.SHOW_COOKIE_BANNER,
      payload: false,
    });
    setUserDidDismissCookieBanner();
    setUserDidAcceptPolicy();
  };

  const handleCookieBannerRejected = () => {
    dispatch({
      type: ACTIONS.SHOW_COOKIE_BANNER,
      payload: false,
    });
    setUserDidDismissCookieBanner();
  };

  return {
    showPrivacyBanner,
    showCookieBanner,
    handlePrivacyBannerAccepted,
    handlePrivacyBannerRejected,
    handleCookieBannerAccepted,
    handleCookieBannerRejected,
  };
};

export default useConsentBanner;
