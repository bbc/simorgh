import React, { useContext, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { func, string } from 'prop-types';
import { ConsentBanner } from '@bbc/psammead-consent-banner';
import { ServiceContext } from '#contexts/ServiceContext';
import BannerText from './Text';
import getDataAttribute from './getDataAttribute';

// Styles to pin the consent banner to the bottom of the view port
// The z-index ensures the banner is always at the front, the value
// being the max value for an integer, this avoiding issues where includes
// use high z-indexes, showing in front of the consent banner:
// https://github.com/bbc/simorgh/issues/8720
const ConsentBannerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2147483647;
`;

const AcceptButton = (message, onClick, dataAttribute) => (
  <button onClick={onClick} type="button" {...dataAttribute}>
    {message}
  </button>
);

const RejectButton = (message, href, onClick, dataAttribute) => (
  <a href={href} onClick={onClick} {...dataAttribute}>
    {message}
  </a>
);

const CanonicalConsentBannerContainer = ({ type, onReject, onAccept }) => {
  const { dir, translations, script, service } = useContext(ServiceContext);

  const consentBannerConfig =
    type === 'cookie'
      ? translations.consentBanner.cookie.canonical
      : translations.consentBanner[type];

  const dataAttribute = getDataAttribute(type);

  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <ConsentBannerWrapper>
      <ConsentBanner
        dir={dir}
        title={consentBannerConfig.title}
        text={BannerText(consentBannerConfig.description)}
        accept={AcceptButton(
          consentBannerConfig.accept,
          onAccept,
          dataAttribute('accept'),
        )}
        reject={RejectButton(
          consentBannerConfig.reject,
          consentBannerConfig.rejectUrl,
          onReject,
          dataAttribute('reject'),
        )}
        script={script}
        service={service}
        headingRef={headingRef}
      />
    </ConsentBannerWrapper>
  );
};

CanonicalConsentBannerContainer.propTypes = {
  type: string.isRequired,
  onReject: func.isRequired,
  onAccept: func.isRequired,
};

export default CanonicalConsentBannerContainer;
