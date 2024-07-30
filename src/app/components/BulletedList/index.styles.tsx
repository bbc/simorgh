import { css, Theme } from '@emotion/react';

export default {
  bulletListItem: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.DOUBLE}rem`,
    }),

  bulletedList: () =>
    css({
      marginTop: 0,
      listStyleType: 'none',
      '& > li ': {
        position: 'relative',
        // fix this
        // color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      },
      '& > li::before': {
        top: '0.5rem',
        content: '""',
        position: 'absolute',
        borderWidth: '1rem',
      },
    }),
  // refactor
  right: () =>
    css({
      right: '-1rem',
    }),
  left: () =>
    css({
      left: '-1rem',
    }),
};
