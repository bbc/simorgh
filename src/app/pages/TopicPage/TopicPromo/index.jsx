import React from 'react';
import { string, number } from 'prop-types';

import Promo from '#components/Promo';

const TopicPromo = ({ title, firstPublished, imageUrl, imageAlt, link }) => {
  return (
    <Promo>
      <Promo.Image src={imageUrl} alt={imageAlt} />
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
};

TopicPromo.defaultProps = {};

export default TopicPromo;
