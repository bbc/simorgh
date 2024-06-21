import { css, Theme } from '@emotion/react';

export default {
  transcript: ({ spacings, palette, isDarkUi }: Theme) =>
    css({
      backgroundColor: isDarkUi ? palette.GREY_7 : palette.WHITE,
      display: 'block',
      marginBottom: `${spacings.TRIPLE}rem`,
      padding: `${spacings.DOUBLE}rem`,
      color: palette.GREY_6,
    }),

  summary: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.WHITE : palette.GREY_10,
    }),

  summaryTitle: ({ palette, isDarkUi, spacings }: Theme) =>
    css({
      color: isDarkUi ? palette.WHITE : palette.GREY_10,
      paddingLeft: `${spacings.HALF}rem`,
    }),

  disclaimer: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.WHITE : palette.GREY_10,
    }),

  ul: ({ spacings, mq }: Theme) =>
    css({
      padding: `0 ${spacings.FULL}rem`,
      listStyle: 'none',
      [mq.GROUP_3_MIN_WIDTH]: {
        padding: `0 ${spacings.DOUBLE}rem`,
      },
    }),

  itemText: ({ spacings, mq }: Theme) =>
    css({
      float: 'left',
      width: `100%`,
      [mq.GROUP_1_MIN_WIDTH]: {
        paddingInlineStart: `${spacings.FULL}rem`,
        width: `calc(75% - ${spacings.FULL}rem)`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        width: `calc(85% - ${spacings.FULL}rem)`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingInlineStart: `${spacings.DOUBLE}rem`,
        width: `calc(90% - ${spacings.DOUBLE}rem)`,
      },
    }),

  listItem: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.DOUBLE}rem`,
      '::after': {
        content: '""',
        display: 'table',
        clear: 'both',
      },
    }),
};
