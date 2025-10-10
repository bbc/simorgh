import React, { use } from 'react';
import { ConsentBannerText } from '#psammead/psammead-consent-banner/src';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const BannerText = ({ uk, international }) => {
  const { isUK } = use(RequestContext);
  const { dir } = use(ServiceContext);

  const { first, linkText, linkUrl, last } = isUK ? uk : international;

  const Link =
    linkUrl && linkText ? (
      <a href={linkUrl} className="focusIndicatorReducedWidth">
        {linkText}
      </a>
    ) : null;

  return (
    <ConsentBannerText dir={dir}>
      {first}
      {Link}
      {last}
    </ConsentBannerText>
  );
};

export default BannerText;
