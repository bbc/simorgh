import React from 'react';
import Promo from '../Promo';

const TopPromo = () => {
  return (
    <Promo>
      <Promo.Link>
        <Promo.Image />
        <Promo.Heading>This is a leading promo</Promo.Heading>
      </Promo.Link>
    </Promo>
  );
};

TopPromo.propTypes = {};

export default TopPromo;
