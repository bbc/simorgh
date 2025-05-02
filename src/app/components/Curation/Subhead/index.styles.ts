import { css, Theme } from '@emotion/react';

const styles = {
  h2: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.doublePica,
      color: palette.GREY_10,
      'a:visited': {
        color: palette.GREY_10,
      },
    }),

  chevronStyles: () =>
    css({
      marginInlineStart: '0.5rem',
      fill: 'currentColor',
      width: `${14 / 16}rem`,
      height: `${14 / 16}rem`,
      position: 'relative',
    }),
};

export default styles;
