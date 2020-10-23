import { css } from 'styled-components';
import {
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
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

export const nestedGridItemSmallCss = css`
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    grid-column: ${props => props.gridColumnStart} / span
      ${props =>
        specifiedOrMaximum(props.gridSpan.group1 || props.gridSpan.default, 6)};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-column: ${props => props.gridColumnStart} / span
      ${props =>
        specifiedOrMaximum(props.gridSpan.group2 || props.gridSpan.default, 4)};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-column: ${props => props.gridColumnStart} / span
      ${props =>
        specifiedOrMaximum(props.gridSpan.group3 || props.gridSpan.default, 5)};
    ${({ marginLeft = {} }) =>
      marginLeft.group3 ? `margin-left: ${marginLeft.group3}` : ''};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column: ${props => props.gridColumnStart} / span
      ${props =>
        specifiedOrMaximum(props.gridSpan.group4 || props.gridSpan.default, 4)};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column: ${props => props.gridColumnStart} / span
      ${props =>
        specifiedOrMaximum(props.gridSpan.group5 || props.gridSpan.default, 8)};
  }
`;

export const nestedGridItemMediumCss = css`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-column: ${props => props.gridColumnStart} / span
      ${props =>
        specifiedOrMaximum(props.gridSpan.group3 || props.gridSpan.default, 5)};
    ${({ marginLeft = {} }) =>
      marginLeft.group3 ? `margin-left: ${marginLeft.group3}` : ''};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column: ${props => props.gridColumnStart} / span
      ${props =>
        specifiedOrMaximum(props.gridSpan.group4 || props.gridSpan.default, 5)};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column: ${props => props.gridColumnStart} / span
      ${props =>
        specifiedOrMaximum(
          props.gridSpan.group5 || props.gridSpan.default,
          10,
        )};
  }
`;

export const nestedGridItemLargeCss = css`
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-column: ${props => props.gridColumnStart} / span
      ${props =>
        specifiedOrMaximum(props.gridSpan.group2 || props.gridSpan.default, 6)};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-column: ${props => props.gridColumnStart} / span
      ${props =>
        specifiedOrMaximum(props.gridSpan.group3 || props.gridSpan.default, 6)};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column: ${props => props.gridColumnStart} / span
      ${props =>
        specifiedOrMaximum(props.gridSpan.group4 || props.gridSpan.default, 6)};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column: ${props => props.gridColumnStart} / span
      ${props =>
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
