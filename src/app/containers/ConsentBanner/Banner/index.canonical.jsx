import React, { useContext } from 'react';
import { func, string } from 'prop-types';
import { ServiceContext } from '../../../contexts/ServiceContext';
import BannerText from './Text';

const Accept = (message, onClick) => (
  <button onClick={onClick} type="button">
    {message}
  </button>
);

const Reject = (message, href, onClick) => (
  <a href={href} onClick={onClick}>
    {message}
  </a>
);

const CanonicalConsentBannerContainer = ({ type, onReject, onAccept }) => {
  const { dir, translations, script, service } = useContext(ServiceContext);
  const consentBannerConfig = translations.consentBanner[type];

  return <p>Consent banner</p>;
};

CanonicalConsentBannerContainer.propTypes = {
  type: string.isRequired,
  onReject: func.isRequired,
  onAccept: func.isRequired,
};

export default CanonicalConsentBannerContainer;
