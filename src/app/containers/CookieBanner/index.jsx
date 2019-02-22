import React, { Fragment, useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';
import CookieBannerComponent from '../../components/CookieBanner';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';

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
      }
    }
  }, []);

  const privacyAction = () => {
    setPrivacy(false);
  };

  const cookieAction = () => {
    setCookie(false);
    Cookie.set(EXPLICIT_COOKIE, '1');
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
                action={privacyAction}
              />
            ) : null}
            {!privacy && cookie ? (
              <CookieBannerComponent
                {...consentBanner}
                rejectUrl={cookieSettingsUrl}
                action={cookieAction}
              />
            ) : null}
          </Fragment>
        );
      }}
    </ServiceContextConsumer>
  );
};

export default CookieBanner;
