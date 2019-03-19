import React from 'react';
import { func, string } from 'prop-types';
import { ServiceContextConsumer } from '../../../contexts/ServiceContext';
import { ConsentBanner } from '../../../components/ConsentBanner';
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

const CanonicalConsentBannerContainer = ({ type, onReject, onAccept }) => (
  <ServiceContextConsumer>
    {({ translations }) => {
      const consentBannerConfig = translations.consentBanner[type];

      return (
        <ConsentBanner
          title={consentBannerConfig.title}
          text={BannerText(consentBannerConfig.description)}
          accept={Accept(consentBannerConfig.accept, onAccept)}
          reject={Reject(
            consentBannerConfig.reject,
            consentBannerConfig.rejectUrl,
            onReject,
          )}
        />
      );
    }}
  </ServiceContextConsumer>
);

CanonicalConsentBannerContainer.propTypes = {
  type: string.isRequired,
  onReject: func.isRequired,
  onAccept: func.isRequired,
};

export default CanonicalConsentBannerContainer;
