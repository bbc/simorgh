import { css, Theme } from '@emotion/react';

export default {
  bulletListItem: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.DOUBLE}rem`,
    }),

  bulletedList: ({ fontSizes, fontVariants, palette, isDarkUi }: Theme) =>
    css({
      marginTop: 0,
      listStyleType: 'none',
      ...fontSizes.bodyCopy,
      ...fontVariants.sansRegular,
      '& > li': {
        position: 'relative',
        // TODO - I've added Grey_10 here, it was not defined before.
        color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      },
      '& > li::before': {
        top: '0.5rem',
        content: '""',
        position: 'absolute',
        borderWidth: '1rem',
        insetInlineStart: '-1rem',
      },
    }),
};
