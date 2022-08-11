import React from 'react';
import styled from '@emotion/styled';

import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import CurationPromo from '../CurationPromo';

const Item = styled.div`
  position: relative;
  .promo-paragraph {
    font-family: ReithSerif;
    font-size: 1rem;
    margin-top: -0.2rem;
    display: none;
  }
`;

const C1 = styled(Item)`
  grid-column: span 2;
  grid-row: span 2;
  .promo-paragraph {
    display: block;
  }
`;

const C2 = styled(Item)``;
const C3 = styled(Item)``;
const C4 = styled(Item)``;
const C5 = styled(Item)``;
const C6 = styled(Item)`
  grid-row: span 2;
`;

const C7 = styled(Item)`
  .promo-left {
    display: none;
  }
`;
const C8 = styled(Item)`
  .promo-left {
    display: none;
  }
`;
const C9 = styled(Item)`
  .promo-left {
    display: none;
  }
`;
const C10 = styled(Item)`
  .promo-left {
    display: none;
  }
`;
const C11 = styled(Item)`
  .promo-left {
    display: none;
  }
`;
const C12 = styled(Item)`
  .promo-left {
    display: none;
  }
`;

// eslint-disable-next-line react/prop-types
const HierarchicalItem = ({ position, promoCount }) => {
  const Component = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12][
    position
  ];
  return (
    <Component>
      <CurationPromo {...fixture.data.summaries[position % promoCount]} />
      <Overlay>{position + 1}</Overlay>
    </Component>
  );
};

export default HierarchicalItem;

const Overlay = styled.div`
  position: absolute;
  top: 5px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.9);
  right: 5px;
  width: 24px;
  height: 24px;
  font-family: sans-serif;
  color: wheat;
  display: flex;
  align-items: center;
  justify-content: center;
`;
