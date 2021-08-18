import React, { useContext } from 'react';
import { oneOfType, func, shape, any } from 'prop-types';

import Banner from './Banner/index.canonical';
import useConsentBanners from './useConsentBanners';
import { UserContext } from '#contexts/UserContext';

const Canonical = ({ onDismissFocusRef }) => {
  const { updateCookiePolicy } = useContext(UserContext);
  const {
    showPrivacyBanner,
    showCookieBanner,
    handlePrivacyBannerAccepted,
    handlePrivacyBannerRejected,
    handleCookieBannerAccepted,
    handleCookieBannerRejected,
  } = useConsentBanners();

  return (
    <>
      {showPrivacyBanner && (
        <Banner
          type="privacy"
          onAccept={handlePrivacyBannerAccepted}
          onReject={handlePrivacyBannerRejected}
        />
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

Canonical.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  onDismissFocusRef: oneOfType([func, shape({ current: any })]),
};

Canonical.defaultProps = {
  onDismissFocusRef: null,
};

export default Canonical;
