import React from 'react';
import { string, number } from 'prop-types';

import Promo from '#components/Promo';

const TopicPromo = ({ heading, timestamp, imageSrc, imageAlt, href }) => {
  return (
    <Promo>
      <Promo.Image src={imageSrc} alt={imageAlt} />
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
};

TopicPromo.defaultProps = {};

export default TopicPromo;
