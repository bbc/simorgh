import { css, Theme } from '@emotion/react';

export default {
  inlinePrompt: ({ palette, spacings }: Theme) =>
    css({
      borderInlineStart: `0.1875rem solid ${palette.GREY_4}`,
      margin: `${spacings.DOUBLE}rem 0`,
      paddingInlineStart: `${spacings.FULL}rem`,
    }),
  examples: ({ spacings }: Theme) =>
    css({
      maxWidth: '60rem',
      margin: '0 auto',
      padding: `${spacings.TRIPLE}rem ${spacings.DOUBLE}rem`,
    }),
  notice: ({ palette, spacings }: Theme) =>
    css({
      borderInlineStart: `0.25rem solid ${palette.POSTBOX}`,
      paddingInlineStart: `${spacings.FULL}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
    }),
  panel: ({ palette, spacings }: Theme) =>
    css({
      maxWidth: '42rem',
      backgroundColor: palette.GREY_2,
      padding: `${spacings.DOUBLE}rem`,
      marginBottom: `${spacings.DOUBLE}rem`,
    }),
  description: ({ spacings }: Theme) =>
    css({
      margin: `${spacings.FULL}rem 0 ${spacings.DOUBLE}rem`,
    }),
};
