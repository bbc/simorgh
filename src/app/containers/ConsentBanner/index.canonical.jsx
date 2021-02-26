import React, { useState, useEffect, useContext, useRef } from 'react';
import { oneOfType, func, shape, any } from 'prop-types';
import Banner from './Banner/index.canonical';
import consentBannerUtilities from './CanonicalLogic';
import { UserContext } from '#contexts/UserContext';

const Canonical = ({ brandRef }) => {
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
    if (brandRef) {
      brandRef.current.focus();
    }
  };

  const consentBannerRef = useRef(null);

  return (
    <>
      {showPrivacy ? (
        <Banner
          type="privacy"
          onAccept={privacyOnAllow}
          onReject={privacyOnReject}
          consentBannerRef={consentBannerRef}
        />
      ) : null}
      {!showPrivacy && showCookie ? (
        <Banner
          type="cookie"
          onAccept={onCookieAccept}
          onReject={cookieOnReject}
          consentBannerRef={consentBannerRef}
        />
      ) : null}
    </>
  );
};

Canonical.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  brandRef: oneOfType([func, shape({ current: any })]),
};

Canonical.defaultProps = {
  brandRef: null,
};

export default Canonical;
