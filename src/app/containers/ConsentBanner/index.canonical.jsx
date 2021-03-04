import React, { useState, useEffect, useContext, forwardRef } from 'react';
import Banner from './Banner/index.canonical';
import consentBannerUtilities from './CanonicalLogic';
import { UserContext } from '#contexts/UserContext';

const Canonical = forwardRef(({ ...props }, onDismissFocusRef) => {
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
    if (onDismissFocusRef) {
      onDismissFocusRef.current.focus();
    }
  };

  return (
    <>
      {showPrivacy ? (
        <Banner
          type="privacy"
          onAccept={privacyOnAllow}
          onReject={privacyOnReject}
          {...props}
        />
      ) : null}
      {!showPrivacy && showCookie ? (
        <Banner
          type="cookie"
          onAccept={onCookieAccept}
          onReject={cookieOnReject}
          {...props}
        />
      ) : null}
    </>
  );
});

export default Canonical;
