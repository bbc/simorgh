import React from 'react';
import { string, number, oneOf, oneOfType } from 'prop-types';

import Promo, { MEDIA_TYPES } from '#components/Promo';

const TopicPromo = ({
  title,
  firstPublished,
  imageUrl,
  imageAlt,
  link,
  mediaType,
  mediaDuration,
}) => {
  return (
    <Promo>
      <Promo.Image src={imageUrl} alt={imageAlt}>
        <Promo.MediaIcon type={mediaType}>{mediaDuration}</Promo.MediaIcon>
      </Promo.Image>
      <Promo.Heading>
        <Promo.A href={link}>{title}</Promo.A>
      </Promo.Heading>
      <Promo.Timestamp>{firstPublished}</Promo.Timestamp>
    </Promo>
  );
};

TopicPromo.propTypes = {
  title: string.isRequired,
  // epoch time or ISO8601 timestamp
  firstPublished: oneOfType([number, string]).isRequired,
  imageUrl: string.isRequired,
  imageAlt: string.isRequired,
  link: string.isRequired,
  mediaType: oneOf(Object.keys(MEDIA_TYPES)),
  mediaDuration: number,
};

TopicPromo.defaultProps = {
  mediaType: null,
  mediaDuration: null,
};

export default TopicPromo;
