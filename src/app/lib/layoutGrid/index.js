import { css } from 'styled-components';
import {
  GEL_MARGIN_BELOW_400PX,
  GEL_GUTTER_BELOW_600PX,
  GEL_MARGIN_ABOVE_400PX,
  GEL_GUTTER_ABOVE_600PX,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
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
/* (1280px - (2*16px margins + 19*16px gutters) / 20 columns = 47.2px = 2.95rem single column width */

const group4WrapperMaxWidth = `45.5rem`;
// (6.75rem * 6) + 5*16px gutters = 728 = 45.5 rem

const group5WrapperMaxWidth = `46.4rem`;
// (2.95rem * 12) + 11*16px gutters = 742.4 = 46.4 rem

const fiveOfSixColumnsMaxWidthGroup4 = `37.75rem`;
/* (group4ColWidth 6.75rem * 5) + (4 * 16px gutters) = 33.75rem + 4rem = 37.75rem */

const tenOfTwelveColumnsMaxWidthGroup5 = `38.5rem`;
/* (group5ColWidth 2.95rem * 10) + (9 * 16px gutters) = 29.5rem + 9rem = 38.5rem */

const fourOfSixColumnsMaxWidthGroup4 = `30rem`;
/* (group4ColWidth 6.75rem * 4) + (3 * 16px gutters) = 27rem + 3rem = 30rem */

const eightOfTwelveColumnsMaxWidthGroup5 = `30.6rem`;
/* (group5ColWidth 2.95rem * 8) + (7 * 16px gutters) = 23.6rem + 7rem = 30.6rem */

const fiveOfSixColumnsMaxWidthScaleable = `83.33%`;
// (5 / 6) * 100 = 83.3333.. = 83.33%

const fourOfSixColumnsMaxWidthScaleable = `66.67%`;
// (4 / 6) * 100 = 66.6666.. = 66.67%

// if the specified grid span is wider than the maximum width the grid will expand
// with an extra grid-gap, so we need this to prevent that from happening
const specifiedOrMaximum = (specified, maximum) =>
  specified > maximum ? maximum : specified;

const nestedGrid = css`
  display: grid;
  grid-column-gap: ${GEL_SPACING_DBL};
`;

export const gelGridMargin = css`
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_MARGIN_BELOW_400PX};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
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
  margin: 0 auto;

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-column-gap: ${GEL_GUTTER_BELOW_600PX};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    grid-column-gap: ${GEL_GUTTER_ABOVE_600PX};
  }
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-template-columns:
      1fr repeat(8, minmax(0, ${group4ColWidth}))
      1fr;
    max-width: ${group4WrapperMaxWidth};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-template-columns:
      1fr repeat(20, minmax(0, ${group5ColWidth}))
      1fr;
    max-width: ${group5WrapperMaxWidth};
  }

  @supports (display: grid) {
    display: grid;
    max-width: initial;
    margin: initial;
  }
`;

export const layoutGridItemLargeNoMargin = css`
  @media (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    grid-column: 1 / span 6;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column: 3 / span 6;
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column: 6 / span 12;
  }
`;

export const layoutGridItemLarge = css`
  ${layoutGridItemLargeNoMargin}
  ${gelGridMargin}
`;

export const layoutGridItemMediumNoMargin = css`
  grid-column: 1 / span 6;
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    ${({ padding = {} }) =>
      padding.group2 ? `padding: 0 ${padding.group2}` : ''};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    grid-column: 1 / span 5;
    max-width: ${fiveOfSixColumnsMaxWidthScaleable};
    ${({ padding = {} }) =>
      padding.group3 ? `padding: 0 ${padding.group3}` : ''};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column: 3 / span 5;
    max-width: ${fiveOfSixColumnsMaxWidthGroup4};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column: ${(props) => props.gridColumnStart} / span
      ${(props) => specifiedOrMaximum(props.gridSpan, 22)};
    max-width: ${tenOfTwelveColumnsMaxWidthGroup5};
  }

  @supports (display: grid) {
    max-width: initial;
  }
`;

export const layoutGridItemMedium = css`
  ${gelGridMargin}
  ${layoutGridItemMediumNoMargin}
`;

export const layoutGridItemSmall = css`
  ${gelGridMargin}

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    grid-column: 1 / span 6;
    ${({ padding = {} }) =>
      padding.group2 ? `padding: 0 ${padding.group2}` : ''};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-column: 1 / span 4;
    max-width: ${fourOfSixColumnsMaxWidthScaleable};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-column: 1 / span 5;
    max-width: ${fiveOfSixColumnsMaxWidthScaleable};
    ${({ padding = {} }) =>
      padding.group3 ? `padding: 0 ${padding.group3}` : ''};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column: 3 / span 4;
    max-width: ${fourOfSixColumnsMaxWidthGroup4};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column: 6 / span 8;
    max-width: ${eightOfTwelveColumnsMaxWidthGroup5};
  }

  @supports (display: grid) {
    max-width: initial;
  }
`;

export const layoutGridItem = css`
  grid-column: 1 / -1;
`;

export const nestedGridItemSmallCss = css`
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    grid-column: ${(props) => props.gridColumnStart} / span
      ${(props) =>
        specifiedOrMaximum(props.gridSpan.group1 || props.gridSpan.default, 6)};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-column: ${(props) => props.gridColumnStart} / span
      ${(props) =>
        specifiedOrMaximum(props.gridSpan.group2 || props.gridSpan.default, 4)};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-column: ${(props) => props.gridColumnStart} / span
      ${(props) =>
        specifiedOrMaximum(props.gridSpan.group3 || props.gridSpan.default, 5)};
    ${({ marginLeft = {} }) =>
      marginLeft.group3 ? `margin-left: ${marginLeft.group3}` : ''};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column: ${(props) => props.gridColumnStart} / span
      ${(props) =>
        specifiedOrMaximum(props.gridSpan.group4 || props.gridSpan.default, 4)};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column: ${(props) => props.gridColumnStart} / span
      ${(props) =>
        specifiedOrMaximum(props.gridSpan.group5 || props.gridSpan.default, 8)};
  }
`;

export const nestedGridItemMediumCss = css`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-column: ${(props) => props.gridColumnStart} / span
      ${(props) =>
        specifiedOrMaximum(props.gridSpan.group3 || props.gridSpan.default, 5)};
    ${({ marginLeft = {} }) =>
      marginLeft.group3 ? `margin-left: ${marginLeft.group3}` : ''};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column: ${(props) => props.gridColumnStart} / span
      ${(props) =>
        specifiedOrMaximum(props.gridSpan.group4 || props.gridSpan.default, 5)};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column: ${(props) => props.gridColumnStart} / span
      ${(props) =>
        specifiedOrMaximum(
          props.gridSpan.group5 || props.gridSpan.default,
          10,
        )};
  }
`;

export const nestedGridItemLargeCss = css`
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-column: ${(props) => props.gridColumnStart} / span
      ${(props) =>
        specifiedOrMaximum(props.gridSpan.group2 || props.gridSpan.default, 6)};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-column: ${(props) => props.gridColumnStart} / span
      ${(props) =>
        specifiedOrMaximum(props.gridSpan.group3 || props.gridSpan.default, 6)};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column: ${(props) => props.gridColumnStart} / span
      ${(props) =>
        specifiedOrMaximum(props.gridSpan.group4 || props.gridSpan.default, 6)};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column: ${(props) => props.gridColumnStart} / span
      ${(props) =>
        specifiedOrMaximum(
          props.gridSpan.group5 || props.gridSpan.default,
          12,
        )};
  }
`;

export const gridContainerLargeCss = css`
  ${nestedGrid}
  @media (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const gridContainerMediumCss = css`
  ${nestedGrid}

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-template-columns: repeat(10, 1fr);
  }

  @supports (display: grid) {
    max-width: initial;
  }
`;

export const gridContainerSmallCss = css`
  ${nestedGrid}

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-template-columns: repeat(8, 1fr);
  }

  @supports (display: grid) {
    max-width: initial;
  }
`;
