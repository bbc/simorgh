import React from 'react';
import { string } from 'prop-types';
import { RequestContextConsumer } from '../../../contexts/RequestContext';
import { ConsentBannerText } from '../../../components/ConsentBanner';

const BannerText = ({ uk, international }) => (
  <RequestContextConsumer>
    {({ isUK }) => {
      console.log(isUK ? 'yes' : 'no');

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
