import React, { useContext } from 'react';
import { bool, string } from 'prop-types';
import { ConsentBanner } from '@bbc/psammead-consent-banner';
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
  const { translations, script } = useContext(ServiceContext);
  const consentBannerConfig = translations.consentBanner[type];

  return (
    <ConsentBanner
      id={promptId}
      title={consentBannerConfig.title}
      text={BannerText(consentBannerConfig.description)}
      accept={Accept(consentBannerConfig.accept, acceptAction)}
      reject={Reject(
        consentBannerConfig.reject,
        consentBannerConfig.rejectUrl,
        rejectAction,
      )}
      hidden={hidden}
      script={script}
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
