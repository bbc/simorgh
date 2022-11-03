import React from 'react';
import { bool, string, number, oneOfType } from 'prop-types';

import Promo from '#components/Promo';

const CurationPromo = ({
  title,
  firstPublished,
  imageUrl,
  imageAlt,
  lazy,
  link,
  type,
  mediaDuration,
  headingLevel,
}) => {
  return (
    <Promo>
      <Promo.Image src={imageUrl} alt={imageAlt} lazyLoad={lazy}>
        <Promo.MediaIcon type={type}>{mediaDuration}</Promo.MediaIcon>
      </Promo.Image>
      <Promo.Heading as={`h${headingLevel}`}>
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
  type: string,
  mediaDuration: number,
  headingLevel: number,
};

CurationPromo.defaultProps = {
  lazy: false,
  type: null,
  mediaDuration: null,
  headingLevel: 2,
};

export default CurationPromo;
