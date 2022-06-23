import React from 'react';
import styled from '@emotion/styled';
import Promo from '../Promo';

const StyledPromoLink = styled(Promo.Link)`
  color: red;
`;

const RegularPromo = () => {
  return (
    <Promo>
      <StyledPromoLink>
        <Promo.Image />
        <Promo.Heading>This is a leading promo</Promo.Heading>
      </StyledPromoLink>
    </Promo>
  );
};

RegularPromo.propTypes = {};

export default RegularPromo;
