import React, { useContext } from 'react';
import { func, string } from 'prop-types';
import { ConsentBanner } from '@bbc/psammead-consent-banner';
import { ServiceContext } from '#contexts/ServiceContext';
import BannerText from './Text';
import getDataAttribute from './getDataAttribute';

const Accept = (message, onClick, dataAttribute) => {
  return (
    <button onClick={onClick} type="button" {...dataAttribute}>
      {message}
    </button>
  );
};

const Reject = (message, href, onClick, dataAttribute) => {
  return (
    <a href={href} onClick={onClick} {...dataAttribute}>
      {message}
    </a>
  );
};

const CanonicalConsentBannerContainer = ({ type, onReject, onAccept }) => {
  const { dir, translations, script, service } = useContext(ServiceContext);
  const consentBannerConfig = translations.consentBanner[type];

  const dataAttribute = getDataAttribute(type);

  return (
    <ConsentBanner
      dir={dir}
      title={consentBannerConfig.title}
      text={BannerText(consentBannerConfig.description)}
      accept={Accept(
        consentBannerConfig.accept,
        onAccept,
        dataAttribute('accept'),
      )}
      reject={Reject(
        consentBannerConfig.reject,
        consentBannerConfig.rejectUrl,
        onReject,
        dataAttribute('reject'),
      )}
      script={script}
      service={service}
    />
  );
};

CanonicalConsentBannerContainer.propTypes = {
  type: string.isRequired,
  onReject: func.isRequired,
  onAccept: func.isRequired,
};

export default CanonicalConsentBannerContainer;
