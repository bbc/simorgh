import { css, Theme } from '@emotion/react';

export default {
  container: ({ spacings }: Theme) =>
    css({
      margin: `${spacings.TRIPLE}rem 0`,
    }),
  link: ({ palette, spacings }: Theme) =>
    css({
      svg: {
        color: palette.GREY_10,
        fill: 'currentColor',
        marginInlineStart: `${spacings.HALF}rem`,
        verticalAlign: 'middle',
      },
    }),
  canonicalLink: ({ spacings, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
      margin: `${spacings.TRIPLE}rem 0`,
    }),
  linkContainer: ({ spacings }: Theme) =>
    css({
      margin: `${spacings.TRIPLE}rem 0`,
    }),
};
