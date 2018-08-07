import { css } from 'styled-components';

export const layoutGridWrapper = css`
  display: grid;
  @media (max-width: 1007px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (min-width: 1008px) and (max-width: 1279px) {
    grid-template-columns: repeat(8, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(10, 1fr);
  }
`;

export const layoutGridMain = css`
  @media (min-width: 600px) and (max-width: 1007px) {
    grid-column: 2 / span 4;
  }
  @media (min-width: 1008px) and (max-width: 1279px) {
    grid-column: 2 / span 6;
  }
  @media (max-width: 599px) {
    grid-column: 1 / span 6;
  }
  @media (min-width: 1280px) {
    grid-column: 3 / span 6;
  }
`;

export const layoutGridFull = css`
  grid-column: 1 / span 10;
`;
