import React, { Fragment, useState, useEffect } from 'react';
import Banner from '../Banner';
import logic from './logic';

const Canonical = () => {
  const [showPrivacy, showPrivacyBanner] = useState(false);
  const [showCookie, showCookieBanner] = useState(false);

  const {
    runInitial,
    privacyOnAllow,
    privacyOnReject,
    cookieOnAllow,
    cookieOnReject,
  } = logic({ showPrivacyBanner, showCookieBanner });

  useEffect(() => {
    runInitial();
  }, []);

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Canonical;
