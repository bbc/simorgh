import { css } from 'styled-components';
import { GEL_SPACING, GEL_SPACING_DBL } from './constants/styles';

export const layoutGridWrapper = css`
  display: grid;
  @media (max-width: 600px) {
    grid-gap: ${GEL_SPACING}px; // Between grid items
    padding: ${GEL_SPACING}px; // On grid wrapper
  }
  @media (min-width: 600px) {
    grid-gap: ${GEL_SPACING_DBL}px; // Between grid items
    padding: ${GEL_SPACING_DBL}px; // On grid wrapper
  }
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

export const layoutGridItem = css`
  @media (max-width: 599px) {
    grid-column: 1 / -1;
  }
  @media (min-width: 600px) and (max-width: 1007px) {
    grid-column: 2 / -2;
  }
  @media (min-width: 1008px) and (max-width: 1279px) {
    grid-column: 2 / -2;
  }
  @media (min-width: 1280px) {
    grid-column: 3 / -3;
  }
`;
