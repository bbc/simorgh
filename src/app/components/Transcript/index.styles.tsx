import { css, Theme } from '@emotion/react';

export default {
  transcript: ({ spacings, palette, isDarkUi }: Theme) =>
    css({
      backgroundColor: isDarkUi ? palette.GREY_7 : palette.WHITE,
      display: 'block',
      marginBottom: `${spacings.TRIPLE}rem`,
      padding: `${spacings.DOUBLE}rem`,
      color: `${palette.GREY_6}`,
      div: {
        ul: {
          paddingInlineStart: '0',
          li: {
            '::before': {
              listStyle: 'none',
              top: '0',
              position: 'absolute',
              borderWidth: '0',
              border: 'none',
              borderRadius: '0',
              left: '0',
            },
          },
        },
      },
    }),

  summary: ({ palette, spacings, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.WHITE : palette.GREY_10,
      paddingBottom: `${spacings.DOUBLE}rem`,
    }),

  summaryTitle: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.WHITE : palette.GREY_10,
    }),
};
