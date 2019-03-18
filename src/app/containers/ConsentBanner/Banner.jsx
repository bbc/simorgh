import React from 'react';
import { func, string } from 'prop-types';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';
import {
  ConsentBanner,
  ConsentBannerButton,
  ConsentBannerLink,
  ConsentBannerText,
} from '../../components/ConsentBanner';

const Accept = (message, onClick) => (
  <ConsentBannerButton onClick={onClick}>{message}</ConsentBannerButton>
);

const Reject = (message, href, onClick) => (
  <ConsentBannerLink href={href} onClick={onClick}>
    {message}
  </ConsentBannerLink>
);

const Text = ({ first, linkText, linkUrl, last }) => {
  const Link = linkUrl && linkText ? <a href={linkUrl}>{linkText}</a> : null;

  return (
    <ConsentBannerText>
      {first}
      {Link}
      {last}
    </ConsentBannerText>
  );
};

Text.propTypes = {
  first: string.isRequired,
  linkText: string.isRequired,
  linkUrl: string.isRequired,
  last: string.isRequired,
};

const ConsentBannerContainer = ({ type, onReject, onAccept }) => (
  <ServiceContextConsumer>
    {({ translations }) => {
      const messaging = translations.consentBanner[type];

      return (
        <ConsentBanner
          title={messaging.title}
          text={Text(messaging.description)}
          accept={Accept(messaging.accept, onAccept)}
          reject={Reject(messaging.reject, messaging.rejectUrl, onReject)}
        />
      );
    }}
  </ServiceContextConsumer>
);

ConsentBannerContainer.propTypes = {
  type: string.isRequired,
  onReject: func.isRequired,
  onAccept: func.isRequired,
};

export default ConsentBannerContainer;
