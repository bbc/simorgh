import React from 'react';
import { func, string } from 'prop-types';
import * as AmpHelpers from 'react-amphtml/helpers';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';
import {
  ConsentBanner,
  ConsentBannerButton,
  ConsentBannerLink,
  ConsentBannerText,
} from '../../components/ConsentBanner';

const Accept = (message, onClick) => (
  <AmpHelpers.Action events={onClick}>
    {props => <ConsentBannerButton {...props} role="button">{message}</ConsentBannerButton>}
  </AmpHelpers.Action>
);

const Reject = (message, href, onClick) => (
  <AmpHelpers.Action events={onClick}>
    {props => (
      <ConsentBannerLink {...props} href={href}>
        {message}
      </ConsentBannerLink>
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

const ConsentBannerContainer = ({ type, onReject, onAccept, promptId }) => (
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
        />
      );
    }}
  </ServiceContextConsumer>
);

export default ConsentBannerContainer;
