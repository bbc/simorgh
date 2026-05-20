import { use } from 'react';

import { UserContext } from '#contexts/UserContext';
import { RequestContext } from '../../../contexts/RequestContext';
import Banner from './Banner/index.canonical';
import useConsentBanners from './useConsentBanners';

const Canonical = ({ onDismissFocusRef = null }) => {
  const { updateCookiePolicy } = use(UserContext);
  const { isUK, showCookieBannerBasedOnCountry } = use(RequestContext);

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
