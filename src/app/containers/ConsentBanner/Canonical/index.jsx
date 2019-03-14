import React, { Fragment, useState, useEffect } from 'react';
import Banner from '../Banner';
import logic from './logic';

const cookieOvenUrl = process.env.SIMORGH_COOKIE_OVEN;

const Canonical = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCookie, setShowCookie] = useState(false);

  const {
    runInitial,
    privacyOnAllow,
    privacyOnReject,
    cookieOnAllow,
    cookieOnReject,
  } = logic({ setShowPrivacy, setShowCookie, cookieOvenUrl });

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
