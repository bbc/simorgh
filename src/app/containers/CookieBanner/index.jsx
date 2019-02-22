import React, { Fragment, useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';
import CookieBannerComponent from '../../components/CookieBanner';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';

const setPolicyCookieIfUnset = value => {
  if (!Cookie.get(POLICY_COOKIE)) {
    Cookie.set(POLICY_COOKIE, value);
  }
};

const CookieBanner = () => {
  const [privacy, setPrivacy] = useState(false);
  const [cookie, setCookie] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (!privacy && Cookie.get(PRIVACY_COOKIE) !== '1') {
        setPrivacy(true);
        Cookie.set(PRIVACY_COOKIE, '1');
      }

      if (!cookie && Cookie.get(EXPLICIT_COOKIE) !== '1') {
        setCookie(true);
        Cookie.set(EXPLICIT_COOKIE, '0');
      }
    }
  }, []);

  const privacyAllowAction = () => {
    setPrivacy(false);
  };

  const privacyDenyAction = () => {
    setPrivacy(false);
  };

  const cookieAllowAction = () => {
    setCookie(false);
    Cookie.set(EXPLICIT_COOKIE, '1');
    setPolicyCookieIfUnset('111');
  };

  const cookieDenyAction = () => {
    setPolicyCookieIfUnset('000');
  };

  return (
    <ServiceContextConsumer>
      {({ translations, privacyInfoUrl, cookieSettingsUrl }) => {
        const { privacyBanner, consentBanner } = translations;

        return (
          <Fragment>
            {privacy ? (
              <CookieBannerComponent
                {...privacyBanner}
                rejectUrl={privacyInfoUrl}
                allowAction={privacyAllowAction}
                denyAction={privacyDenyAction}
              />
            ) : null}
            {!privacy && cookie ? (
              <CookieBannerComponent
                {...consentBanner}
                rejectUrl={cookieSettingsUrl}
                allowAction={cookieAllowAction}
                denyAction={cookieDenyAction}
              />
            ) : null}
          </Fragment>
        );
      }}
    </ServiceContextConsumer>
  );
};

export default CookieBanner;
