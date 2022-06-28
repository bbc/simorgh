import React from 'react';
import Promo from '../Promo';

const RelatedContentPromo = () => {
  return (
    <Promo>
      <Promo.Link>
        <Promo.Image />
        <Promo.Heading>This is a leading promo</Promo.Heading>
      </Promo.Link>
    </Promo>
  );
};

RelatedContentPromo.propTypes = {};

export default RelatedContentPromo;
