import React, { useState, useEffect, useContext } from 'react';
import { oneOfType, func, shape, any } from 'prop-types';
import Banner from './Banner/index.canonical';
import consentBannerUtilities from './CanonicalLogic';
import { UserContext } from '#contexts/UserContext';

const Canonical = ({ onDismissFocusRef, ...props }) => {
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
};

Canonical.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  onDismissFocusRef: oneOfType([func, shape({ current: any })]),
};

Canonical.defaultProps = {
  onDismissFocusRef: null,
};

export default Canonical;
