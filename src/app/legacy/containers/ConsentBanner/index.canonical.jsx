import React, { useContext } from 'react';
import { oneOfType, func, shape, any } from 'prop-types';

import { RequestContext } from '#contexts/RequestContext';
import { UserContext } from '#contexts/UserContext';
import Banner from './Banner/index.canonical';
import useConsentBanners from './useConsentBanners';

const Canonical = ({ onDismissFocusRef }) => {
  const { isApp } = useContext(RequestContext);
  const { updateCookiePolicy } = useContext(UserContext);

  const {
    showPrivacyBanner,
    showCookieBanner,
    handlePrivacyBannerAccepted,
    handleCookieBannerAccepted,
    handleCookieBannerRejected,
  } = useConsentBanners();

  if (isApp) return null;

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

Canonical.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  onDismissFocusRef: oneOfType([func, shape({ current: any })]),
};

Canonical.defaultProps = {
  onDismissFocusRef: null,
};

export default Canonical;
