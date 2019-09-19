import React, { useState, useEffect, useContext } from 'react';
import Banner from './Banner/index.canonical';
import consentBannerUtilities from './CanonicalLogic';
import { UserContext } from '#contexts/UserContext';

const Canonical = () => {
  const { updateCookiePolicy } = useContext(UserContext);
  const [showPrivacy, setShowPrivacyBanner] = useState(false);
  const [showCookie, setShowCookieBanner] = useState(false);

  const {
    runInitial,
    privacyOnAllow,
    privacyOnReject,
    cookieOnAllow,
    cookieOnReject,
  } = consentBannerUtilities({ setShowPrivacyBanner, setShowCookieBanner });

  useEffect(runInitial, []);

  const onCookieAccept = () => {
    cookieOnAllow();
    updateCookiePolicy();
  };

  return (
    <>
      {showPrivacy ? (
        <Banner
          type="privacy"
          onAccept={privacyOnAllow}
          onReject={privacyOnReject}
        />
      ) : null}
      {!showPrivacy && showCookie ? (
        <Banner
          type="cookie"
          onAccept={onCookieAccept}
          onReject={cookieOnReject}
        />
      ) : null}
    </>
  );
};

export default Canonical;
