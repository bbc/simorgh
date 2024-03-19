import { css, Theme } from '@emotion/react';
import { grid } from '#psammead/psammead-styles/src/detection';

// Gets the number of grid rows, taking into account the
// trustProjectLink in the grid being separate, on its own row.
const getRowCount = (itemCount, columns, trustProjectLink) =>
  trustProjectLink
    ? Math.ceil(itemCount / columns) + 1
    : Math.ceil(itemCount / columns);

export default {
  list: ({ palette, mq, spacings }: Theme) =>
    css({
      borderBottom: `0.0625rem solid ${palette.SHADOW}`,
      columnCount: 4,
      margin: 0,
      listStyleType: 'none',
      [`@supports (${grid})`]: {
        display: 'grid',
        gridAutoFlow: 'column',
      },
      [mq.GROUP_0_MAX_WIDTH]: {
        gridAutoFlow: 'row',
        columnCount: 1,
      },
      [mq.GROUP_2_MAX_WIDTH]: {
        gridColumnGap: `${spacings.FULL}rem`,
        gridTemplateColumns: 'repeat(2, 1fr)',
        columnCount: 2,
      },
      [mq.GROUP_3_ONLY]: {
        gridColumnGap: `${spacings.DOUBLE}rem`,
        gridTemplateColumns: 'repeat(3, 1fr)',
        columnCount: 3,
      },
      [mq.GROUP_4_ONLY]: {
        gridColumnGap: `${spacings.DOUBLE}rem`,
        gridTemplateColumns: 'repeat(4, 1fr)',
        columnCount: 4,
      },
    }),
  paddingWithTrustProjectLink: ({ spacings }: Theme) =>
    css({
      padding: `0 0 ${spacings.FULL}rem`,
    }),
  paddingWithoutTrustProjectLink: ({ spacings }: Theme) =>
    css({
      padding: `${spacings.FULL}rem 0`,
    }),
};

const StyledList = styled.ul`
  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-template-rows: repeat(
      ${({ itemCount, trustProjectLink }) =>
        getRowCount(itemCount, 2, trustProjectLink)},
      auto
    );
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-template-rows: repeat(
      ${({ itemCount, trustProjectLink }) =>
        getRowCount(itemCount, 3, trustProjectLink)},
      auto
    );
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(
      ${({ itemCount, trustProjectLink }) =>
        getRowCount(itemCount, 4, trustProjectLink)},
      auto
    );
    column-count: 4;
  }

  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(
      ${({ itemCount, trustProjectLink }) =>
        getRowCount(itemCount, 5, trustProjectLink)},
      auto
    );
    column-count: 5;
  }

  ${({ trustProjectLink }) =>
    props =>
      trustProjectLink &&
      `> li:first-of-type {
    border-bottom: 0.0625rem solid ${props.theme.palette.SHADOW};
    padding: ${GEL_SPACING} 0;
    margin-bottom: ${GEL_SPACING};
    grid-column: 1/-1;
    width: 100%;
    column-span: all;
  }`}
`;
