import React from 'react';
import { bool, string, number, oneOf, oneOfType } from 'prop-types';

import Promo, { MEDIA_TYPES } from '#components/Promo';

const CurationPromo = ({
  title,
  firstPublished,
  imageUrl,
  imageAlt,
  lazy,
  link,
  mediaType,
  mediaDuration,
  headingStyle,
}) => {
  return (
    <Promo>
      <Promo.Image src={imageUrl} alt={imageAlt} loading={lazy ? 'lazy' : null}>
        <Promo.MediaIcon type={mediaType}>{mediaDuration}</Promo.MediaIcon>
      </Promo.Image>
      <Promo.Heading as={headingStyle}>
        <Promo.A href={link}>{title}</Promo.A>
      </Promo.Heading>
      <Promo.Timestamp>{firstPublished}</Promo.Timestamp>
    </Promo>
  );
};

CurationPromo.propTypes = {
  title: string.isRequired,
  // epoch time or ISO8601 timestamp
  firstPublished: oneOfType([number, string]).isRequired,
  imageUrl: string.isRequired,
  imageAlt: string.isRequired,
  lazy: bool,
  link: string.isRequired,
  mediaType: oneOf(Object.values(MEDIA_TYPES)),
  mediaDuration: number,
  headingStyle: string,
};

CurationPromo.defaultProps = {
  lazy: false,
  mediaType: null,
  mediaDuration: null,
  headingStyle: 'h2',
};

export default CurationPromo;
