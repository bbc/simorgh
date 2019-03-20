import React from 'react';
import { arrayOf, bool, shape, string } from 'prop-types';
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

const AmpConsentBannerContainer = ({
  type,
  acceptAction,
  rejectAction,
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
          accept={Accept(messaging.accept, acceptAction)}
          reject={Reject(messaging.reject, messaging.rejectUrl, rejectAction)}
          hidden={hidden}
        />
      );
    }}
  </ServiceContextConsumer>
);

AmpConsentBannerContainer.propTypes = {
  type: string.isRequired,
  acceptAction: shape({ tap: arrayOf(string) }).isRequired,
  rejectAction: shape({ tap: arrayOf(string) }).isRequired,
  promptId: string.isRequired,
  hidden: bool,
};

AmpConsentBannerContainer.defaultProps = {
  hidden: null,
};

export default AmpConsentBannerContainer;
