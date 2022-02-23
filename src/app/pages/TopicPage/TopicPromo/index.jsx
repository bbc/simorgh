import React from 'react';
import { string, number, oneOf } from 'prop-types';

import Promo, { MEDIA_TYPES } from '#components/Promo';

const TopicPromo = ({
  title,
  timestamp,
  imageUrl,
  imageAlt,
  link,
  mediaType,
  mediaDuration,
}) => {
  return (
    <Promo>
      <Promo.Image src={imageSrc} alt={imageAlt}>
        <Promo.MediaIcon type={mediaType}>{mediaDuration}</Promo.MediaIcon>
      </Promo.Image>
      <Promo.A href={link}>
        <Promo.Heading>{title}</Promo.Heading>
      </Promo.A>
      <Promo.Timestamp>{firstPublished}</Promo.Timestamp>
    </Promo>
  );
};

TopicPromo.propTypes = {
  title: string.isRequired,
  firstPublished: number.isRequired,
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
