import React from 'react';
import styled from '@emotion/styled';
import Item from './item';

const Wrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 599px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 399px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 239px) {
    grid-template-columns: 1fr;
  }
`;

const HierarchicalGrid = () => {
  const promos = new Array(12).fill();
  return (
    <Wrapper>
      {promos.map((promo, i) => (
        <Item key={i} position={i} promoCount={12} />
      ))}
    </Wrapper>
  );
};

export default HierarchicalGrid;
