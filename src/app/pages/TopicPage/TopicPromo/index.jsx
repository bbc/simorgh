import React from 'react';
import { string, number, oneOf } from 'prop-types';

import Promo, { MEDIA_TYPES } from '#components/Promo';

const TopicPromo = ({
  heading,
  timestamp,
  imageSrc,
  imageAlt,
  href,
  mediaType,
  mediaDuration,
}) => {
  return (
    <Promo>
      <Promo.Image src={imageSrc} alt={imageAlt}>
        <Promo.MediaIcon type={mediaType}>{mediaDuration}</Promo.MediaIcon>
      </Promo.Image>
      <Promo.A href={href}>
        <Promo.Heading>{heading}</Promo.Heading>
      </Promo.A>
      <Promo.Timestamp>{timestamp}</Promo.Timestamp>
    </Promo>
  );
};

TopicPromo.propTypes = {
  heading: string.isRequired,
  timestamp: number.isRequired,
  imageSrc: string.isRequired,
  imageAlt: string.isRequired,
  href: string.isRequired,
  mediaType: oneOf(Object.keys(MEDIA_TYPES)),
  mediaDuration: number,
};

TopicPromo.defaultProps = {
  mediaType: null,
  mediaDuration: null,
};

export default TopicPromo;
