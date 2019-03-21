import React from 'react';
import { string } from 'prop-types';
import { ConsentBannerText } from '../../../components/ConsentBanner';

const BannerText = ({ first, linkText, linkUrl, last }) => {
  const Link = linkUrl && linkText ? <a href={linkUrl}>{linkText}</a> : null;

  return (
    <ConsentBannerText>
      {first}
      {Link}
      {last}
    </ConsentBannerText>
  );
};

BannerText.propTypes = {
  first: string.isRequired,
  linkText: string,
  linkUrl: string,
  last: string,
};

BannerText.defaultProps = {
  linkText: null,
  linkUrl: null,
  last: null,
};

export default BannerText;
