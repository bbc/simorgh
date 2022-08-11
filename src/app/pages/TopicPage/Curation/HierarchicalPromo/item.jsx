import React from 'react';
import styled from '@emotion/styled';

import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import CurationPromo from '../CurationPromo';

const horizontal = `
    .promo-text { padding-inline-start: 0.5rem;
    width: 67%;
    display: inline-block;
    vertical-align: top; }
    .promo-image { width: 33%;
      display: inline-block;
      vertical-align: top; }
`;

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
  @media (max-width: 239px) {
    grid-column: span 1;
  }
  @media (max-width: 399px) {
    .promo-paragraph {
      display: none;
    }
  }
`;

const C2 = styled(Item)`
  @media (max-width: 239px) {
    ${horizontal}
  }
`;
const C3 = styled(Item)`
  @media (max-width: 239px) {
    ${horizontal}
  }
`;
const C4 = styled(Item)`
  @media (min-width: 400px) and (max-width: 599px) {
    .promo-image {
      display: none;
    }
  }
  @media (max-width: 239px) {
    ${horizontal}
  }
`;
const C5 = styled(Item)`
  @media (min-width: 400px) and (max-width: 599px) {
    .promo-image {
      display: none;
    }
  }
  @media (max-width: 239px) {
    ${horizontal}
  }
`;
const C6 = styled(Item)`
  grid-row: span 2;

  @media (min-width: 400px) and (max-width: 599px) {
    grid-row: span 1;
    .promo-image {
      display: none;
    }
  }

  @media (max-width: 399px) {
    grid-row: span 1;
  }
  @media (max-width: 239px) {
    ${horizontal}
  }
`;

const C7 = styled(Item)`
  @media (min-width: 400px) {
    .promo-image {
      display: none;
    }
  }
  @media (max-width: 239px) {
    ${horizontal}
  }
`;
const C8 = styled(Item)`
  .promo-image {
    display: none;
  }
  @media (max-width: 399px) {
    grid-column: span 2;
    ${horizontal}
  }
  @media (max-width: 239px) {
    grid-column: span 1;
  }
`;
const C9 = styled(Item)`
  .promo-image {
    display: none;
  }
  @media (max-width: 399px) {
    grid-column: span 2;
    ${horizontal}
  }
  @media (max-width: 239px) {
    grid-column: span 1;
  }
`;
const C10 = styled(Item)`
  .promo-image {
    display: none;
  }
  @media (max-width: 399px) {
    grid-column: span 2;
    ${horizontal}
  }
  @media (max-width: 239px) {
    grid-column: span 1;
  }
`;
const C11 = styled(Item)`
  .promo-image {
    display: none;
  }
  @media (max-width: 399px) {
    grid-column: span 2;
    ${horizontal}
  }
  @media (max-width: 239px) {
    grid-column: span 1;
  }
`;
const C12 = styled(Item)`
  .promo-image {
    display: none;
  }
  @media (max-width: 399px) {
    grid-column: span 2;
    ${horizontal}
  }
  @media (max-width: 239px) {
    grid-column: span 1;
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
