import React from 'react';
import Promo from '../Promo';

const LeadingPromo = () => {
  return (
    <Promo>
      <Promo.Link>
        <Promo.Image />
        <Promo.Heading>This is a leading promo</Promo.Heading>
      </Promo.Link>
    </Promo>
  );
};

LeadingPromo.propTypes = {};

export default LeadingPromo;
