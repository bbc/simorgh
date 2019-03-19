import React from 'react';
import { func, string, bool } from 'prop-types';
import * as AmpHelpers from 'react-amphtml/helpers';
import { ServiceContextConsumer } from '../../../contexts/ServiceContext';
import { ConsentBanner } from '../../../components/ConsentBanner';
import BannerText from './Text';

const Accept = (message, onClick) => (
  <AmpHelpers.Action events={onClick}>
    {props => (
      <button {...props} type="button">
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
          text={BannerText(messaging.description)}
          accept={Accept(messaging.accept, onAccept)}
          reject={Reject(messaging.reject, messaging.rejectUrl, onReject)}
          hidden={hidden}
        />
      );
    }}
  </ServiceContextConsumer>
);

ConsentBannerContainer.propTypes = {
  type: string.isRequired,
  onReject: func.isRequired,
  onAccept: func.isRequired,
  promptId: string,
  hidden: bool,
};

ConsentBannerContainer.defaultProps = {
  promptId: null,
  hidden: null,
};

export default ConsentBannerContainer;