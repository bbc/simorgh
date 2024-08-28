import { css, Theme } from '@emotion/react';
import { grid } from '#psammead/psammead-styles/src/detection';
import { FooterLink } from '#app/models/types/serviceConfig';
import {
  GROUP_1_AND_GROUP_2,
  GROUP_3_ONLY,
  GROUP_4_ONLY,
  GROUP_5_MIN_WIDTH,
} from '#components/ThemeProvider/mediaQueries';

// Gets the number of grid rows, taking into account the
// trustProjectLink in the grid being separate, on its own row.
const getRowCount = ({
  itemCount,
  columns,
  trustProjectLink,
}: {
  itemCount: number;
  columns: number;
  trustProjectLink?: FooterLink;
}) =>
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
      [mq.GROUP_1_AND_GROUP_2]: {
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
      [mq.GROUP_5_MIN_WIDTH]: {
        gridColumnGap: `${spacings.DOUBLE}rem`,
        gridTemplateColumns: 'repeat(5, 1fr)',
        columnCount: 5,
      },
    }),
  listPaddingWithTrustProjectLink: ({ spacings }: Theme) =>
    css({
      padding: `0 0 ${spacings.FULL}rem`,
    }),
  listPaddingWithoutTrustProjectLink: ({ spacings }: Theme) =>
    css({
      padding: `${spacings.FULL}rem 0`,
    }),
  listItemWithBottomBorder: ({ palette, spacings }: Theme) =>
    css({
      '> li:first-of-type': {
        borderBottom: `0.0625rem solid ${palette.SHADOW}`,
        padding: `${spacings.FULL}rem 0`,
        marginBottom: `${spacings.FULL}rem`,
        gridColumn: `1/-1`,
        width: '100%',
        columnSpan: 'all',
      },
    }),
  listItem: ({ spacings }: Theme) =>
    css({
      minWidth: '50%',
      columnGap: `${spacings.DOUBLE}rem`,
      breakInside: 'avoid-column',
    }),
};

export const gridTemplateRows = ({
  itemCount,
  trustProjectLink,
}: {
  itemCount: number;
  trustProjectLink?: FooterLink;
}) =>
  css({
    [GROUP_1_AND_GROUP_2]: {
      gridTemplateRows: `repeat(${getRowCount({
        itemCount,
        columns: 2,
        trustProjectLink,
      })}, auto)`,
    },
    [GROUP_3_ONLY]: {
      gridTemplateRows: `repeat(${getRowCount({
        itemCount,
        columns: 3,
        trustProjectLink,
      })}, auto)`,
    },
    [GROUP_4_ONLY]: {
      gridTemplateRows: `repeat(${getRowCount({
        itemCount,
        columns: 4,
        trustProjectLink,
      })}, auto)`,
    },
    [GROUP_5_MIN_WIDTH]: {
      gridTemplateRows: `repeat(${getRowCount({
        itemCount,
        columns: 5,
        trustProjectLink,
      })}, auto)`,
    },
  });
