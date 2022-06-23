import React from 'react';
import Promo from '../Promo';

const TopStoriesPromo = () => {
  return (
    <Promo>
      <Promo.Link>
        <Promo.Image />
        <Promo.Heading>This is a leading promo</Promo.Heading>
      </Promo.Link>
    </Promo>
  );
};

TopStoriesPromo.propTypes = {};

export default TopStoriesPromo;
