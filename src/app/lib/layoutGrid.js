import { css } from 'styled-components';
import {
  GEL_MARGIN_BELOW_400PX,
  GEL_GUTTER_BELOW_600PX,
  GEL_MARGIN_ABOVE_400PX,
  GEL_GUTTER_ABOVE_600PX,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

const group4ColWidth = `6.75rem`;
/* (1008px - (2*16px margins + 7*16px gutters) / 8 columns = 108px = 6.75rem single column width */

const group5ColWidth = `2.95rem`;
/* (1280px - (2*16px margins + 19*16px gutters)  / 20 columns = 110.4px = 2.95rem single column width */

export const layoutWrapperWithoutGrid = css`
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_MARGIN_BELOW_400PX};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_MARGIN_ABOVE_400PX};
  }
`;

/*
  0-599px: 8px gutter
  600+: 16px gutter

  0-399px: 8px margin
  400-1007px: 16px margin
  1008+: no explicit margin, since we use 16px gutters as margin
*/

export const layoutGridWrapper = css`
  display: -ms-grid;
  display: grid;
  margin: 0 auto;
  max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-gap: 0 ${GEL_GUTTER_BELOW_600PX};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    grid-gap: 0 ${GEL_GUTTER_ABOVE_600PX};
  }
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    -ms-grid-columns: (1fr)[6]; // prettier-ignore
    grid-template-columns: 0 repeat(6, 1fr) 0;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    -ms-grid-columns: 1fr (minmax(0, ${group4ColWidth}))[8] 1fr; // prettier-ignore
    grid-template-columns: 1fr repeat(8, minmax(0, ${group4ColWidth})) 1fr;
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    -ms-grid-columns: 1fr (minmax(0, ${group5ColWidth}))[20] 1fr; // prettier-ignore
    grid-template-columns: 0 repeat(20, minmax(0, ${group5ColWidth})) 0;
  }
`;

export const layoutGridItemLarge = css`
  @media (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    -ms-grid-column: 1;
    -ms-grid-column-span: 6;
    grid-column: 1 / -1;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    -ms-grid-column: 3;
    -ms-grid-column-span: 6;
    grid-column: 3 / -3;
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    -ms-grid-column: 6;
    -ms-grid-column-span: 12;
    grid-column: 6 / -6;
  }
`;

export const layoutGridItemLargeWithMargin = css`
  ${layoutGridItemLarge}
  @media (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    -ms-grid-column: 1;
    -ms-grid-column-span: 6;
    grid-column: 2 / -2;
  }
`;

export const layoutGridItemMedium = css`
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    -ms-grid-column: 1;
    -ms-grid-column-span: 6;
    grid-column: 2 / -2;
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    -ms-grid-column: 1;
    -ms-grid-column-span: 5;
    grid-column: 2 / -3;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    -ms-grid-column: 3;
    -ms-grid-column-span: 5;
    grid-column: 3 / -4;
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    -ms-grid-column: 6;
    -ms-grid-column-span: 10;
    grid-column: 6 / -8;
  }
`;

export const layoutGridItemSmall = css`
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    -ms-grid-column: 1;
    -ms-grid-column-span: 6;
    grid-column: 2 / -2;
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    -ms-grid-column: 1;
    -ms-grid-column-span: 4;
    grid-column: 2 / -4;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    -ms-grid-column: 1;
    -ms-grid-column-span: 5;
    grid-column: 2 / -3;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    -ms-grid-column: 3;
    -ms-grid-column-span: 4;
    grid-column: 3 / -5;
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    -ms-grid-column: 6;
    -ms-grid-column-span: 8;
    grid-column: 6 / -10;
  }
`;

export const layoutGridItem = css`
  grid-column: 1 / -1;
`;
