import React, { useContext } from 'react';
import { string, shape } from 'prop-types';
import { ConsentBannerText } from '@bbc/psammead-consent-banner';
import { RequestContext } from '../../../contexts/RequestContext';

const BannerText = ({ uk, international }) => {
  const { isUK } = useContext(RequestContext);

  const { first, linkText, linkUrl, last } = isUK ? uk : international;

  const Link = linkUrl && linkText ? <a href={linkUrl}>{linkText}</a> : null;

  return (
    <ConsentBannerText>
      {first}
      {Link}
      {last}
    </ConsentBannerText>
  );
};

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
