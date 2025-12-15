import { css, Theme } from '@emotion/react';

export default {
  container: ({ palette, spacings }: Theme) =>
    css({
      display: 'inline-block',
      background: palette.POSTBOX,
      textAlign: 'center',
      width: '10rem',
      padding: `${spacings.FULL}rem 0`,
    }),
  heading: ({ palette }: Theme) =>
    css({
      background: palette.WHITE,
    }),
  guage: ({ palette, spacings }: Theme) =>
    css({
      color: palette.WHITE,
      display: 'block',
      marginTop: `${spacings.HALF}rem`,
    }),
};
