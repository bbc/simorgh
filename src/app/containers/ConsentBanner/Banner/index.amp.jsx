import React, { useContext, useEffect, useRef } from 'react';
import { bool, string } from 'prop-types';
import { ConsentBanner } from '@bbc/psammead-consent-banner';
import AmpCookieBanner from './cookie.amp';
import { ServiceContext } from '#contexts/ServiceContext';
import BannerText from './Text';
import getDataAttribute from './getDataAttribute';

const Button = (message, onClick, dataAttribute) => (
  <button type="button" on={onClick} {...dataAttribute}>
    {message}
  </button>
);

const Anchor = (message, href, onClick, dataAttribute) => (
  <a href={href} on={onClick} {...dataAttribute}>
    {message}
  </a>
);

const AmpConsentBannerContainer = ({
  type,
  acceptAction,
  rejectAction,
  promptId,
  hidden,
}) => {
  const { dir, translations, script, service } = useContext(ServiceContext);

  const dataAttribute = getDataAttribute(type);

  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return type === 'cookie' ? (
    <AmpCookieBanner
      id={promptId}
      translations={[
        translations.consentBanner.cookie.amp.initial,
        translations.consentBanner.cookie.amp.manage,
      ]}
      accept={Button(
        translations.consentBanner.cookie.amp.accept,
        acceptAction,
        dataAttribute('accept'),
      )}
      reject={Button(
        translations.consentBanner.cookie.amp.reject,
        rejectAction,
        dataAttribute('reject'),
      )}
      hidden={hidden}
      script={script}
      service={service}
      headingRef={headingRef}
    />
  ) : (
    <ConsentBanner
      dir={dir}
      id={promptId}
      title={translations.consentBanner[type].title}
      text={BannerText(translations.consentBanner[type].description)}
      accept={Button(
        translations.consentBanner[type].accept,
        acceptAction,
        dataAttribute('accept'),
      )}
      reject={Anchor(
        translations.consentBanner[type].reject,
        translations.consentBanner[type].rejectUrl,
        rejectAction,
        dataAttribute('reject'),
      )}
      hidden={hidden}
      script={script}
      service={service}
      headingRef={headingRef}
    />
  );
};

AmpConsentBannerContainer.propTypes = {
  type: string.isRequired,
  acceptAction: string.isRequired,
  rejectAction: string.isRequired,
  promptId: string.isRequired,
  hidden: bool,
};

AmpConsentBannerContainer.defaultProps = {
  hidden: null,
};

export default AmpConsentBannerContainer;
