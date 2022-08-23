import { css, Theme } from '@emotion/react';

export default {
  self: ({ spacings, palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      padding: `${spacings.DOUBLE}rem`,
      minHeight: 280,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }),

  heading: css({}),

  textBody: ({ spacings }: Theme) =>
    css({
      margin: `${spacings.DOUBLE}rem 0`,
    }),

  button: ({ spacings, palette }: Theme) =>
    css({
      color: palette.WHITE,
      backgroundColor: palette.BRAND_BACKGROUND,
      border: 'none',
      fontWeight: 'bold',
      padding: `${spacings.FULL}rem`,
      cursor: 'pointer',
    }),
};
