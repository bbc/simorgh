import React, { useContext } from 'react';

import { UserContext } from '#contexts/UserContext';
import Banner from './Banner/index.canonical';
import useConsentBanners from './useConsentBanners';
import { RequestContext } from '../../../contexts/RequestContext';

const Canonical = ({ onDismissFocusRef = null }) => {
  const { updateCookiePolicy } = useContext(UserContext);
  const { isUK, showCookieBannerBasedOnCountry } = useContext(RequestContext);

  const {
    showPrivacyBanner,
    showCookieBanner,
    handlePrivacyBannerAccepted,
    handleCookieBannerAccepted,
    handleCookieBannerRejected,
  } = useConsentBanners(isUK, showCookieBannerBasedOnCountry);

  return (
    <>
      {showPrivacyBanner && (
        <Banner type="privacy" onAccept={handlePrivacyBannerAccepted} />
      )}
      {showCookieBanner && (
        <Banner
          type="cookie"
          onAccept={() => {
            handleCookieBannerAccepted();
            updateCookiePolicy();
            onDismissFocusRef?.current?.querySelector('a')?.focus();
          }}
          onReject={handleCookieBannerRejected}
        />
      )}
    </>
  );
};

export default Canonical;
