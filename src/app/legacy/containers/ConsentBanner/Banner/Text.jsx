import React, { useContext } from 'react';
import { string, shape } from 'prop-types';
import { ConsentBannerText } from '#psammead/psammead-consent-banner/src';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const BannerText = ({ uk, international }) => {
  const { isUK } = useContext(RequestContext);
  const { dir, script } = useContext(ServiceContext);

  const { first, linkText, linkUrl, last } = isUK ? uk : international;

  const Link = linkUrl && linkText ? <a href={linkUrl}>{linkText}</a> : null;

  return (
    <ConsentBannerText dir={dir} script={script}>
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
