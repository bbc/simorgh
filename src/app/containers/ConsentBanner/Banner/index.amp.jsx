import React, { useContext } from 'react';
import { bool, string } from 'prop-types';
import { ConsentBanner } from '@bbc/psammead-consent-banner';
import { ServiceContext } from '#contexts/ServiceContext';
import BannerText from './Text';
import getDataAttribute from './getDataAttribute';

const Accept = (message, onClick, dataAttribute) => (
  <button type="button" on={onClick} {...dataAttribute}>
    {message}
  </button>
);

const Reject = (message, href, onClick, dataAttribute) => (
  <div href={href} on={onClick} {...dataAttribute}>
    {message}
  </div>
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

  const dataAttribute = getDataAttribute(type);

  return (
    <ConsentBanner
      dir={dir}
      id={promptId}
      title={consentBannerConfig.title}
      text={BannerText(consentBannerConfig.description)}
      accept={Accept(
        consentBannerConfig.accept,
        acceptAction,
        dataAttribute('accept'),
      )}
      reject={Reject(
        consentBannerConfig.reject,
        consentBannerConfig.rejectUrl,
        rejectAction,
        dataAttribute('reject'),
      )}
      hidden={hidden}
      script={script}
      service={service}
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
