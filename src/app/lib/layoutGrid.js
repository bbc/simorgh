import { css } from 'styled-components';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  group2ScreenWidthMax,
  group3ScreenWidthMin,
  group3ScreenWidthMax,
  group4ScreenWidthMin,
  group4ScreenWidthMax,
  group5ScreenWidthMin,
} from './constants/styles';

export const layoutGridWrapper = css`
  display: grid;
  @media (max-width: ${group3ScreenWidthMin}) {
    grid-gap: ${GEL_SPACING}; // Between grid items
    padding: 0 ${GEL_SPACING}; // On grid wrapper
  }
  @media (min-width: ${group3ScreenWidthMin}) {
    grid-gap: ${GEL_SPACING_DBL}; // Between grid items
    padding: 0 ${GEL_SPACING_DBL}; // On grid wrapper
  }
  @media (max-width: ${group3ScreenWidthMax}) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (min-width: ${group4ScreenWidthMin}) and (max-width: ${group4ScreenWidthMax}) {
    grid-template-columns: repeat(8, 1fr);
  }
  @media (min-width: ${group5ScreenWidthMin}) {
    grid-template-columns: repeat(10, 1fr);
  }
`;

export const layoutGridItem = css`
  @media (max-width: ${group2ScreenWidthMax}) {
    grid-column: 1 / -1;
  }
  @media (min-width: ${group3ScreenWidthMin}) and (max-width: ${group3ScreenWidthMax}) {
    grid-column: 2 / -2;
  }
  @media (min-width: ${group4ScreenWidthMin}) and (max-width: ${group4ScreenWidthMax}) {
    grid-column: 2 / -2;
  }
  @media (min-width: ${group5ScreenWidthMin}) {
    grid-column: 3 / -3;
  }
`;

export const layoutGridItemFullWidth = css`
  grid-column: 1 / -1;
`;
