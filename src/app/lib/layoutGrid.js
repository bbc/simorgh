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

const group5ColWidth = `6.9rem`;
/* (1280px - (2*16px margins + 9*16px gutters)  / 10 columns = 110.4px = 6.9rem single column width */

const group3MaxWidth = `66.67%`;

const group4MaxWidth = `75%`;

const group5MaxWidth = `46.4rem`;
/* (6 * 6.9rem single column width) + (5 * 1rem gutters) = 46.4rem */

const group4WrapperMaxWidth = `63rem`;

const group5WrapperMaxWidth = `80rem`;

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
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    max-width: ${group4WrapperMaxWidth};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    max-width: ${group5WrapperMaxWidth};
  }
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_MARGIN_BELOW_400PX};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: 0 ${GEL_MARGIN_ABOVE_400PX};
  }

  @supports (display: grid) {
    max-width: none;
    margin-left: initial;
    margin-right: initial;

    @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
      grid-gap: ${GEL_GUTTER_BELOW_600PX};
    }
    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      grid-gap: ${GEL_GUTTER_ABOVE_600PX};
    }
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      -ms-grid-columns: (1fr)[6]; // prettier-ignore
      grid-template-columns: repeat(6, 1fr);
    }
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
      -ms-grid-columns: 1fr (minmax(0, ${group4ColWidth}))[8] 1fr; // prettier-ignore
      grid-template-columns: 1fr repeat(8, minmax(0, ${group4ColWidth})) 1fr;
    }
    @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
      -ms-grid-columns: 1fr (minmax(0, ${group5ColWidth}))[10] 1fr; // prettier-ignore
      grid-template-columns: 1fr repeat(10, minmax(0, ${group5ColWidth})) 1fr;
    }
  }
`;

export const layoutGridItemConstrained = css`
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    max-width: ${group3MaxWidth};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    max-width: ${group4MaxWidth};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    max-width: ${group5MaxWidth};
  }

  @supports (display: grid) {
    max-width: none;
    margin-left: initial;
    margin-right: initial;

    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      -ms-grid-column: 1;
      -ms-grid-column-span: 6;
      grid-column: 1 / -1;
    }
    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      -ms-grid-column: 2;
      -ms-grid-column-span: 4;
      grid-column: 2 / -2;
    }
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
      -ms-grid-column: 3;
      -ms-grid-column-span: 6;
      grid-column: 3 / -3;
    }
    @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
      -ms-grid-column: 4;
      -ms-grid-column-span: 6;
      grid-column: 4 / -4;
    }
  }
`;

export const layoutGridItem = css`
  grid-column: 1 / -1;
`;
