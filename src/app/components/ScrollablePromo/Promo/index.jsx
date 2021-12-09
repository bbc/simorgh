import React from 'react';
import { object, string } from 'prop-types';
import styled from '@emotion/styled';
import PromoLink from '../PromoLink';

const Promo = ({ block, Ourstyle }) => {
  const StyledDiv = styled.div(Ourstyle);
  return (
    <StyledDiv Ourstyle={Ourstyle}>
      <PromoLink block={block} />
    </StyledDiv>
  );
};

Promo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  block: object.isRequired,
  Ourstyle: string.isRequired,
};

export default Promo;
