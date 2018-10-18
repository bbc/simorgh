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
    grid-gap: 0 ${GEL_SPACING}; /* Between grid items */
  }
  @media (min-width: ${group3ScreenWidthMin}) {
    grid-gap: 0 ${GEL_SPACING_DBL}; /* Between grid items */
  }
  @media (max-width: ${group3ScreenWidthMax}) {
    grid-template-columns: repeat(6, [col] 1fr);
  }
  @media (min-width: ${group4ScreenWidthMin}) and (max-width: ${group4ScreenWidthMax}) {
    /* 
      Math: (1008 - (7*16))/8 = 112
      Explainer: (width - 7 gaps of 16) / 8 columns = signle column width
    */
    grid-template-columns: [start] 1fr repeat(8, [col] minmax(0, 112px)) 1fr [end];
  }
  @media (min-width: ${group5ScreenWidthMin}) {
    /* 
      Math: (1280 - (9*16))/10 = 113.6
      Explainer: (width - 9 gaps of 16) / 10 columns = signle column width
    */
    grid-template-columns: [start] 1fr repeat(10, [col] minmax(0, 113.6px)) 1fr [end];
  }
`;

export const layoutGridItem = css`
  @media (max-width: ${group2ScreenWidthMax}) {
    grid-column: 1 / -1;
    padding: 0 ${GEL_SPACING};
  }
  @media (min-width: ${group3ScreenWidthMin}) and (max-width: ${group3ScreenWidthMax}) {
    grid-column: col 2 / span 4;
  }
  @media (min-width: ${group4ScreenWidthMin}) and (max-width: ${group4ScreenWidthMax}) {
    grid-column: col 2 / span 6;
  }
  @media (min-width: ${group5ScreenWidthMin}) {
    grid-column: col 3 / span 6;
  }
`;

export const layoutGridItemFullWidth = css`
  grid-column: 1 / -1;
`;
