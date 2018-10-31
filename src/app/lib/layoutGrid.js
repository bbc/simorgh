import { css } from 'styled-components';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  group2ScreenWidthMin,
  group3ScreenWidthMin,
  group3ScreenWidthMax,
  group4ScreenWidthMin,
  group4ScreenWidthMax,
  group5ScreenWidthMin,
} from './constants/styles';

const group4ColWidth = `6.75rem`;
/* (1008px - (2*16px margins + 7*16px gutters) / 8 columns = 108px = 6.75rem single column width */

const group5ColWidth = `6.9rem`;
/* (1280px - (2*16px margins + 9*16px gutters)  / 10 columns = 110.4px = 6.9rem single column width */

export const layoutGridWrapper = css`
  display: grid;
  @media (max-width: ${group2ScreenWidthMin}) {
    grid-gap: ${GEL_SPACING};
    padding: 0 ${GEL_SPACING};
  }
  @media (min-width: ${group2ScreenWidthMin}) and (max-width: ${group3ScreenWidthMax}) {
    padding: 0 ${GEL_SPACING_DBL};
  }
  @media (min-width: ${group3ScreenWidthMin}) {
    grid-gap: ${GEL_SPACING_DBL};
  }
  @media (max-width: ${group3ScreenWidthMax}) {
    grid-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(6, 1fr);
  }
  @media (min-width: ${group4ScreenWidthMin}) and (max-width: ${group4ScreenWidthMax}) {
    grid-template-columns: 1fr repeat(8, minmax(0, ${group4ColWidth})) 1fr;
  }
  @media (min-width: ${group5ScreenWidthMin}) {
    grid-template-columns: 1fr repeat(10, minmax(0, ${group5ColWidth})) 1fr;
  }
`;

export const layoutGridItem = css`
  @media (max-width: ${group3ScreenWidthMin}) {
    grid-column: 1 / -1;
  }
  @media (min-width: ${group3ScreenWidthMin}) and (max-width: ${group3ScreenWidthMax}) {
    grid-column: 2 / -2;
  }
  @media (min-width: ${group4ScreenWidthMin}) and (max-width: ${group4ScreenWidthMax}) {
    grid-column: 3 / -3;
  }
  @media (min-width: ${group5ScreenWidthMin}) {
    grid-column: 4 / -4;
  }
`;

export const layoutGridItemFullWidth = css`
  grid-column: 1 / -1;
`;
