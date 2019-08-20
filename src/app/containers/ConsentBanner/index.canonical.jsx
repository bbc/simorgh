import React, { useState, useEffect } from 'react';
import Banner from './Banner/index.canonical';
import consentBannerUtilities from './CanonicalLogic';

const Canonical = () => {
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
          onAccept={cookieOnAllow}
          onReject={cookieOnReject}
        />
      ) : null}
    </>
  );
};

export default Canonical;
