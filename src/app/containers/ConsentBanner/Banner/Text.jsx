import React from 'react';
import { string, shape } from 'prop-types';
import { RequestContextConsumer } from '../../../contexts/RequestContext';
import { ConsentBannerText } from '../../../components/ConsentBanner';

const BannerText = ({ uk, international }) => (
  <RequestContextConsumer>
    {({ isUK }) => {
      const { first, linkText, linkUrl, last } = isUK ? uk : international;

      const Link =
        linkUrl && linkText ? <a href={linkUrl}>{linkText}</a> : null;

      return (
        <ConsentBannerText>
          {first}
          {Link}
          {last}
        </ConsentBannerText>
      );
    }}
  </RequestContextConsumer>
);

const messagingProps = {
  first: string.isRequired,
  linkText: string,
  linkUrl: string,
  last: string,
};

BannerText.propTypes = {
  uk: shape(messagingProps).isRequired,
  international: shape(messagingProps).isRequired,
};

export default BannerText;
