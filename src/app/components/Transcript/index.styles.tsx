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

  ul: ({ spacings, palette, isDarkUi }: Theme) =>
    css({
      paddingTop: `${spacings.DOUBLE}rem`,
      paddingInlineStart: '0',
      listStyle: 'none',
      li: {
        paddingBottom: `${spacings.HALF}rem`,
        // check on hack prototype what these style do
        // '::before': {
        //   listStyle: 'none',
        //   top: '0',
        //   position: 'absolute',
        //   borderWidth: '0',
        //   border: 'none',
        //   borderRadius: '0',
        //   left: '0',
        // },
      },
    }),

  itemText: ({ spacings }: Theme) =>
    css({
      paddingInlineStart: `${spacings.FULL}rem`,
    }),
};
