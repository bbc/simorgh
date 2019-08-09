import React, { useContext } from 'react';
import { bool, string } from 'prop-types';
import { ServiceContext } from '../../../contexts/ServiceContext';
import BannerText from './Text';

const Accept = (message, onClick) => (
  <button type="button" on={onClick}>
    {message}
  </button>
);

const Reject = (message, href, onClick) => (
  <a href={href} on={onClick}>
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
  const consentBannerConfig = translations.consentBanner[type];

  return <p>Consent banner</p>;
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
