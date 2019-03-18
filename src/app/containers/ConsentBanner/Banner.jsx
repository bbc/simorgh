import React from 'react';
import { func, string } from 'prop-types';
import * as AmpHelpers from 'react-amphtml/helpers';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';
import {
  ConsentBanner,
  ConsentBannerText,
} from '../../components/ConsentBanner';

const Accept = (message, onClick) => (
  <AmpHelpers.Action events={onClick}>
    {props => (
      <button {...props} role="button">
        {message}
      </button>
    )}
  </AmpHelpers.Action>
);

const Reject = (message, href, onClick) => (
  <AmpHelpers.Action events={onClick}>
    {props => (
      <a {...props} href={href}>
        {message}
      </a>
    )}
  </AmpHelpers.Action>
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

const ConsentBannerContainer = ({
  type,
  onReject,
  onAccept,
  promptId,
  hidden,
}) => (
  <ServiceContextConsumer>
    {({ translations }) => {
      const messaging = translations.consentBanner[type];

      return (
        <ConsentBanner
          id={promptId}
          title={messaging.title}
          text={Text(messaging.description)}
          accept={Accept(messaging.accept, onAccept)}
          reject={Reject(messaging.reject, messaging.rejectUrl, onReject)}
          hidden={hidden}
        />
      );
    }}
  </ServiceContextConsumer>
);

export default ConsentBannerContainer;
