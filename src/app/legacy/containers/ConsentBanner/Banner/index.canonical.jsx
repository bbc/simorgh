import React, { useContext, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { ConsentBanner } from '#psammead/psammead-consent-banner/src';
import { ServiceContext } from '../../../../contexts/ServiceContext';
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

const AcceptButton = ({ message, onClick, dataAttribute }) => (
  <button onClick={onClick} type="button" {...dataAttribute}>
    {message}
  </button>
);

const RejectButton = ({ message, href, onClick, dataAttribute = {} }) => (
  <a href={href} onClick={onClick} {...dataAttribute}>
    {message}
  </a>
);

const CanonicalConsentBannerContainer = ({
  type,
  onReject = () => {},
  onAccept,
}) => {
  const { dir, translations, script, service } = useContext(ServiceContext);

  const consentBannerConfig =
    type === 'cookie'
      ? translations.consentBanner.cookie.canonical
      : translations.consentBanner[type];
  const ukText = consentBannerConfig.description.uk;
  const internationalText = consentBannerConfig.description.international;

  const dataAttribute = getDataAttribute(type);

  const headingRef = useRef(null);

  useEffect(() => {
    const hasHashInUrl = window.location.hash;

    if (hasHashInUrl) {
      const urlHashValue = window.location.href.split('#')[1];
      const isShareUrl = urlHashValue.startsWith('asset:');
      if (!isShareUrl) headingRef.current?.focus();
    } else {
      headingRef.current?.focus();
    }
  }, []);

  return (
    <ConsentBannerWrapper>
      <ConsentBanner
        dir={dir}
        title={consentBannerConfig.title}
        text={<BannerText uk={ukText} international={internationalText} />}
        accept={
          <AcceptButton
            message={consentBannerConfig.accept}
            onClick={onAccept}
            dataAttribute={dataAttribute('accept')}
          />
        }
        reject={
          <RejectButton
            message={consentBannerConfig.reject}
            href={consentBannerConfig.rejectUrl}
            onClick={onReject}
            dataAttribute={dataAttribute('reject')}
          />
        }
        script={script}
        service={service}
        headingRef={headingRef}
      />
    </ConsentBannerWrapper>
  );
};

export default CanonicalConsentBannerContainer;
