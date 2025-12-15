import { css, Theme } from '@emotion/react';

export default {
  container: ({ palette, spacings }: Theme) =>
    css({
      position: 'fixed',
      display: 'inline-block',
      background: palette.POSTBOX,
      textAlign: 'center',
      width: '10rem',
      padding: `${spacings.FULL}rem 0`,
      bottom: '0.75rem',
      insetInlineEnd: '0.75rem',
      zIndex: 5,
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
