import React from 'react';
import { string } from 'prop-types';

import Promo from '#components/Promo';

const TopicPromo = ({ heading, footer, imageSrc, imageAlt, href }) => {
  return (
    <Promo>
      <Promo.Image src={imageSrc} alt={imageAlt} />
      <Promo.A href={href}>
        <Promo.Heading>{heading}</Promo.Heading>
      </Promo.A>
      <Promo.Footer>{footer}</Promo.Footer>
    </Promo>
  );
};

TopicPromo.propTypes = {
  heading: string.isRequired,
  footer: string.isRequired,
  imageSrc: string.isRequired,
  imageAlt: string.isRequired,
  href: string.isRequired,
};

TopicPromo.defaultProps = {};

export default TopicPromo;
