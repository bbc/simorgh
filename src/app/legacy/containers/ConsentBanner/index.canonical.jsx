import React, { useContext } from 'react';
import { oneOfType, func, shape, any } from 'prop-types';

import { UserContext } from '#contexts/UserContext';
import Banner from './Banner/index.canonical';
import useConsentBanners from './useConsentBanners';
import { RequestContext } from '../../../contexts/RequestContext';

const Canonical = ({ onDismissFocusRef }) => {
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

Canonical.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  onDismissFocusRef: oneOfType([func, shape({ current: any })]),
};

Canonical.defaultProps = {
  onDismissFocusRef: null,
};

export default Canonical;
